"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shiftBoard_1 = require("./shiftBoard");
class shiftMaster {
    constructor(users) {
        this.nextShiftBoard = new shiftBoard_1.shiftBoard();
        this.usersToShift = users;
        this.prefs = [];
    }
    //init user function: get users from db, convert them into "solve_logic" user objects and add them to the user list
    //dilema: should have can_person_take_shift function or just have a list of available shifts for a person?
    //dilema:
    //init constraitnts function, get constraints from db and convert them into "solve_logic" constraints
    //solve function -> function that uses all of the data after it is eneterd and return a new board, calls save_to_db
    //save_to_db -> calls converter functions, saces to the db all of the new updates
    //can_person_take_shift checks if a user in this shift is valid
    filter_users(users, shift) {
        return users;
    }
    find_optimal_user(shift, available_users) {
        var selected_user = available_users.reduce((prev, curr) => {
            return prev.scoreWithShift[shift.shiftId] <
                curr.scoreWithShift[shift.shiftId]
                ? prev
                : curr;
        });
        return selected_user;
    }
    solve() {
        this.updateAvgScore();
        this.sortShiftsByAvgScore();
        //start with the worst shift and inset the person that has the least total injustice after getting it
        for (var shift of this.nextShiftBoard.getAllShifts()) {
            var available_users = this.filter_users(this.usersToShift, shift);
            for (var user of available_users) {
                user.scoreWithShift[shift.shiftId] = this.calculateNextJustice(user, shift);
            }
            var user_to_shift = this.find_optimal_user(shift, available_users);
            user_to_shift.justicePoints = this.calculateNextJustice(user_to_shift, shift);
            shift.user_taken = user_to_shift;
        }
    }
    updateAvgScore() {
        for (var shift of this.nextShiftBoard.getAllShifts()) {
            for (var Preferance of this.prefs) {
                var count = 0;
                if (Preferance.shiftId == shift.shiftId) {
                    shift.avgScore += Preferance.points;
                    count++;
                }
                shift.avgScore = shift.avgScore / count;
            }
        }
    }
    sortShiftsByAvgScore() {
        for (var shift of this.nextShiftBoard.getAllShifts()) {
            this.nextShiftBoard
                .getAllShifts()
                .sort((a, b) => (a.avgScore < b.avgScore ? 1 : -1));
        }
    }
    getShiftPref(user, shift) {
        var _a;
        const points_allocated = (_a = this.prefs.find((preferance) => preferance.shiftId == shift.shiftId && preferance.user == user)) === null || _a === void 0 ? void 0 : _a.points;
        return points_allocated ? points_allocated : 0;
    }
    calculateNextJustice(user, shift) {
        return user.justicePoints + this.getShiftPref(user, shift);
    }
}
