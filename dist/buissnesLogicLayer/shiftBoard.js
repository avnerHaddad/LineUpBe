"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftBoard = void 0;
class shiftBoard {
    constructor(shifts) {
        this.shifts = shifts;
    }
    getShiftsForUser(userId) {
        return this.shifts.filter(shift => shift.availableUsers.some(user => user.id === userId));
    }
    getshiftsByWeekday(weekday) {
        return this.shifts.filter(shift => shift.weekday === weekday);
    }
    sortUsersForAllShifts() {
        for (var shift of this.shifts) {
            shift.sortUsers();
        }
    }
    getNextShift(shift) {
        //if shift type is night return the morning shift og the next day
        //if shift type is evening return the night shift of the same day
        //if shift type is morning return the evening shift of the same day
        if (shift.type === 'night') {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'morning');
        }
        else if (shift.type === 'evening') {
            return this.shifts.find(s => s.weekday === shift.weekday + 1 && s.type === 'night');
        }
        else {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'evening');
        }
    }
    getPrevShift(shift) {
        //if shift type is night return the evening shift of the same day
        //if shift type is evening return the morning shift of the same day
        //if shift type is morning return the night shift of the previous day
        if (shift.type === 'night') {
            return this.shifts.find(s => s.weekday === shift.weekday - 1 && s.type === 'evening');
        }
        else if (shift.type === 'evening') {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'morning');
        }
        else {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'night');
        }
    }
}
exports.shiftBoard = shiftBoard;
