import {shiftBoard} from "./shiftBoard";
import {user} from "./user";
import {shift} from "./shift";
import {getAllUsers} from "../dal/User/userFunctions";
import {error} from "console";
import {logic, NearestShiftLogic, NightShiftLogic, NoSameDayLogic} from "./logic";
import {getAllPreferences} from "../dal/Prefs/PreferenceFunctions";
import {getAllConstraints} from "../dal/Constraints/ConstraintFunctions";
import {getAllRecurringShifts} from "../dal/ReacuringShifts/ReacuringShiftsFunctions";


import _ from 'lodash';
import {shiftFactory, userFactory} from "./shiftFactory";

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
    for (const user of currentShift.availableUsers) {
      //copy shiftboard
      let prevboard = _.cloneDeep(this.nextShiftBoard)
      let prevUsers = _.cloneDeep(this.usersToShift);
      user.justicePoints = this.calculateNextJustice(user, currentShift);
      currentShift.shiftUser(user);
      user.justicePoints = this.calculateNextJustice(user, currentShift);
      this.nextShiftBoard.sortUsersForAllShifts();

      for (let logic of this.logics) {
        logic.applyLogic(user, this.nextShiftBoard, currentShift);
      }

      if (await this.backtrack(index + 1)) {
        return true;
      }

      // Backtrack: remove the user from the current shift
      currentShift.unShiftUser();
      this.nextShiftBoard = prevboard;
      this.usersToShift = prevUsers;
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


  async initialiseShifts(startDate: Date, endDate: Date) {
    try {
        // Retrieve all users
      this.usersToShift = await userFactory();
      // Retrieve data in parallel
      const [constraints, recurringShifts, preferences] = await Promise.all([
        getAllConstraints(startDate, endDate, true),
        getAllRecurringShifts(),
        getAllPreferences()
      ]);
      let shifts = await shiftFactory(recurringShifts, this.usersToShift, constraints, preferences);
      this.nextShiftBoard = new shiftBoard(shifts);
    } catch (error) {
      console.error('Error initializing shifts:', error);
    }
  }
}

