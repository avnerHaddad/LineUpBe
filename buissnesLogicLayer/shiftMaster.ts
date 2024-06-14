import { shiftBoard } from "./shiftBoard";
import { user } from "./user";
import { shift } from "./shift";
import { getAllUsers } from "../dal/User/userFunctions";
import { error } from "console";
import {logic, NightShiftLogic, MaxShiftsPerWeekLogic, NearestShiftLogic, NoSameDayLogic} from "./logic";
import { getAllPreferences } from "../dal/Prefs/PreferenceFunctions";
import { getAllConstraints } from "../dal/Constraints/ConstraintFunctions";
import { getAllRecurringShifts } from "../dal/ReacuringShifts/ReacuringShiftsFunctions";


import _ from 'lodash';

export class shiftMaster {
  usersToShift!: user[];
  nextShiftBoard!: shiftBoard;
  logics!: logic[];

  constructor() {
    this.logics = [new NightShiftLogic(), new NearestShiftLogic(), new NoSameDayLogic()];
  }

  async solve() {
    this.sortShiftsByAvgScore();
    if (await this.backtrack(0)) {
      console.log("All shifts have been successfully assigned.");
      return this.nextShiftBoard.shifts;
    } else {
      console.log("No valid assignment found for all shifts.");
    }
  }

  async backtrack(index: number): Promise<boolean> {
    if (index >= this.nextShiftBoard.shifts.length) {
      // Base case: all shifts have been assigned
      return true;
    }

    const currentShift = this.nextShiftBoard.shifts[index];
    const available_users = currentShift.availableUsers;

    for (const user of currentShift.availableUsers) {
      //copy shiftboard
      let prevboard = _.cloneDeep(this.nextShiftBoard)
      user.justicePoints = this.calculateNextJustice(user, currentShift);
      currentShift.user_taken = user;
      currentShift.is_filled = true;
      user.justicePoints = this.calculateNextJustice(user, currentShift);
      this.nextShiftBoard.sortUsersForAllShifts();

      for (let logic of this.logics) {
        logic.applyLogic(user, this.nextShiftBoard, currentShift);
      }

      if (await this.backtrack(index + 1)) {
        // If assigning this user to the current shift leads to a valid assignment, return true
        user.justicePoints = this.calculateNextJustice(user, currentShift);
        return true;
      }

      // Backtrack: remove the user from the current shift
      currentShift.user_taken = null;
      currentShift.is_filled = false;
      this.nextShiftBoard = prevboard;
      //remove user from the shifts available users
      currentShift.availableUsers = currentShift.availableUsers.filter((u) => u.id !== user.id);
    }

    // No valid assignment found for this shift
    return false;
  }

  sortShiftsByAvgScore() {
    for (var shift of this.nextShiftBoard.shifts) {
      this.nextShiftBoard
          .shifts
          .sort((a: shift, b: shift) => (a.avgScore < b.avgScore ? 1 : -1));
    }
  }

  calculateNextJustice(user: user, shift: shift) {
    return user.justicePoints + shift.userPreferences.get(user.id)!;
  }

  async initialiseUsers(startDate: Date, endDate: Date) {
    var users = await getAllUsers();
    this.usersToShift = [];
    if (Array.isArray(users)) {
      for (var raw_user of users) {
        this.usersToShift.push(new user(raw_user));
      }
    } else {
      throw error;
    }
  }

  async initialiseShifts(startDate: Date, endDate: Date) {
    try {
      // Retrieve data in parallel
      const [constraints, recurringShifts, preferences] = await Promise.all([
        getAllConstraints(startDate, endDate, true),
        getAllRecurringShifts(),
        getAllPreferences()
      ]);
      this.nextShiftBoard = new shiftBoard(recurringShifts, this.usersToShift, constraints, preferences, startDate, endDate);
    } catch (error) {
      console.error('Error initializing shifts:', error);
    }
  }
}

