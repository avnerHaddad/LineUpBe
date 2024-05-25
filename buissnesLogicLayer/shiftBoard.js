"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftBoard = void 0;
const day_1 = require("./day");
class shiftBoard {
    constructor(ReacuringShifts, usersToShift, constraints, Preferences) {
        this.sunday = new day_1.day(1);
        this.monday = new day_1.day(2);
        this.tuesday = new day_1.day(3);
        this.wednesday = new day_1.day(4);
        this.thursday = new day_1.day(5);
        this.friday = new day_1.day(6);
        this.saturday = new day_1.day(7);
    }
    getAllShifts() {
        let allShifts = [];
        allShifts = allShifts.concat(this.sunday.getShifts(), this.monday.getShifts(), this.tuesday.getShifts(), this.wednesday.getShifts(), this.thursday.getShifts(), this.friday.getShifts(), this.saturday.getShifts());
        return allShifts;
    }
}
exports.shiftBoard = shiftBoard;
