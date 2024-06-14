"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftMaster = void 0;
const shiftBoard_1 = require("./shiftBoard");
const user_1 = require("./user");
const readerFunctions_1 = require("../dal/readerFunctions");
const console_1 = require("console");
class shiftMaster {
    solve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sortShiftsByAvgScore();
            if (yield this.backtrack(0)) {
                console.log("All shifts have been successfully assigned.");
                console.log(this.nextShiftBoard.shifts);
            }
            else {
                console.log("No valid assignment found for all shifts.");
            }
        });
    }
    backtrack(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (index >= this.nextShiftBoard.shifts.length) {
                // Base case: all shifts have been assigned
                return true;
            }
            const currentShift = this.nextShiftBoard.shifts[index];
            const available_users = currentShift.availableUsers;
            for (const user of available_users) {
                user.scoreWithShift[currentShift.shiftId] = this.calculateNextJustice(user, currentShift);
                currentShift.user_taken = user;
                if (yield this.backtrack(index + 1)) {
                    // If assigning this user to the current shift leads to a valid assignment, return true
                    user.justicePoints = this.calculateNextJustice(user, currentShift);
                    return true;
                }
                // Backtrack: remove the user from the current shift
                currentShift.user_taken = null;
            }
            // No valid assignment found for this shift
            return false;
        });
    }
    sortShiftsByAvgScore() {
        for (var shift of this.nextShiftBoard.shifts) {
            this.nextShiftBoard
                .shifts
                .sort((a, b) => (a.avgScore < b.avgScore ? 1 : -1));
        }
    }
    calculateNextJustice(user, shift) {
        return user.justicePoints + shift.userPreferences.get(user.id);
    }
    initialiseUsers(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var users = yield (0, readerFunctions_1.getAllUsers)();
            this.usersToShift = [];
            if (Array.isArray(users)) {
                for (var raw_user of users) {
                    this.usersToShift.push(new user_1.user(raw_user));
                }
            }
            else {
                throw console_1.error;
            }
        });
    }
    initialiseShifts(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            //get constraints
            var constraints = yield (0, readerFunctions_1.getAllConfirmedConstraints)(startDate, endDate);
            var ReacuringShifts = yield (0, readerFunctions_1.getAllRecurringShifts)();
            var prefs = yield (0, readerFunctions_1.getAllPreferences)();
            this.nextShiftBoard = new shiftBoard_1.shiftBoard(ReacuringShifts, this.usersToShift, constraints, prefs, startDate, endDate);
        });
    }
}
exports.shiftMaster = shiftMaster;
//# sourceMappingURL=shiftMaster.js.map