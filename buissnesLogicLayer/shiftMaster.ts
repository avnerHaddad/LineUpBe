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

  //init user function: get users from db, convert them into "solve_logic" user objects and add them to the user list

  //dilema: should have can_person_take_shift function or just have a list of available shifts for a person?
  //dilema:

  //init constraitnts function, get constraints from db and convert them into "solve_logic" constraints
  //solve function -> function that uses all of the data after it is eneterd and return a new board, calls save_to_db
  //save_to_db -> calls converter functions, saces to the db all of the new updates
  //can_person_take_shift checks if a user in this shift is valid
  filter_users(users: user[], shift: shift) {
    return users;
  }
  find_optimal_user(shift: shift, available_users: user[]): user {
    var selected_user: user = available_users.reduce((prev, curr) => {
      return prev.scoreWithShift[shift.shiftId] <
        curr.scoreWithShift[shift.shiftId]
        ? prev
        : curr;
    });
    return selected_user;
  }

  solve() {
    this.sortShiftsByAvgScore();
    //start with the worst shift and inset the person that has the least total injustice after getting it
    for (var shift of this.nextShiftBoard.getAllShifts()) {
      var available_users: user[] = this.filter_users(this.usersToShift, shift);
      for (var user of available_users) {
        user.scoreWithShift[shift.shiftId] = this.calculateNextJustice(
          user,
          shift,
        );
      }
      var user_to_shift = this.find_optimal_user(shift, available_users);
      user_to_shift.justicePoints = this.calculateNextJustice(
        user_to_shift,
        shift,
      );
      shift.user_taken = user_to_shift;
    }
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

  async initialiseUsers(startDate: Date, endDate: Date){
    var users = await getAllUsers();
    if (Array.isArray(users)) {
      for(var raw_user of users){
        this.usersToShift.push(new user(raw_user));
      }
    } else {
      throw error;
    }
  }


  initialiseShifts(startDate: Date, endDate: Date){
    //get constraints
    var constraints = async ()=> await getAllConfirmedConstraints(startDate, endDate);
    var ReacuringShi= async ()=> await getAllRecurringShifts();
    var prefs = async ()=> await getAllPreferences();
    this.nextShiftBoard = new shiftBoard(ReacuringShi(), this.usersToShift, constraints(), prefs());
 
}

}
