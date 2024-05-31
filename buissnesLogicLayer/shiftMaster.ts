import { shiftBoard } from "./shiftBoard";
import { user } from "./user";
import { shift } from "./shift";
import { Preferance } from "./Preference";
import { getAllConfirmedConstraints, getAllPreferences, getAllUsers, getAllRecurringShifts } from "../dal/readerFunctions";
import { Constraint, ReacuringShift } from '../dal/models';
import { getReacuringShiftsByJob } from "../dal/querries";
import { error } from "console";
class shiftMaster {
  usersToShift: user[];
  nextShiftBoard!: shiftBoard;

  constructor(users: user[]) {
    this.usersToShift = users;
  }

  async solve() {
    this.sortShiftsByAvgScore();
    const allShifts = this.nextShiftBoard.getAllShifts();
    if (await this.backtrack(allShifts, 0)) {
      console.log("All shifts have been successfully assigned.");
    } else {
      console.log("No valid assignment found for all shifts.");
    }
  }

  async backtrack(shifts: shift[], index: number): Promise<boolean> {
    if (index >= shifts.length) {
      // Base case: all shifts have been assigned
      return true;
    }

    const currentShift = shifts[index];
    const available_users = currentShift.availableUsers;

    for (const user of available_users) {
      user.scoreWithShift[currentShift.shiftId] = this.calculateNextJustice(user, currentShift);
      currentShift.user_taken = user;

      if (await this.backtrack(shifts, index + 1)) {
        // If assigning this user to the current shift leads to a valid assignment, return true
        user.justicePoints = this.calculateNextJustice(user, currentShift);
        return true;
      }

      // Backtrack: remove the user from the current shift
      currentShift.user_taken = null;
    }

    // No valid assignment found for this shift
    return false;
  }

  sortShiftsByAvgScore() {
    for (var shift of this.nextShiftBoard.getAllShifts()) {
      this.nextShiftBoard
        .getAllShifts()
        .sort((a: shift, b: shift) => (a.avgScore < b.avgScore ? 1 : -1));
    }
  }

  calculateNextJustice(user: user, shift: shift) {
    return user.justicePoints + shift.userPreferences.get(user.id)!;
  }

  async initialiseUsers(startDate: Date, endDate: Date) {
    var users = await getAllUsers();
    if (Array.isArray(users)) {
      for (var raw_user of users) {
        this.usersToShift.push(new user(raw_user));
      }
    } else {
      throw error;
    }
  }

  async initialiseShifts(startDate: Date, endDate: Date) {
    //get constraints
    var constraints = await getAllConfirmedConstraints(startDate, endDate);
    var ReacuringShifts = await getAllRecurringShifts();
    var prefs = await getAllPreferences();
    this.nextShiftBoard = new shiftBoard(ReacuringShifts, this.usersToShift, constraints, prefs, startDate, endDate);
  }
}
