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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftMaster = void 0;
const shiftBoard_1 = require("./shiftBoard");
const user_1 = require("./user");
const userFunctions_1 = require("../dal/User/userFunctions");
const console_1 = require("console");
const logic_1 = require("./logic");
const PreferenceFunctions_1 = require("../dal/Prefs/PreferenceFunctions");
const ConstraintFunctions_1 = require("../dal/Constraints/ConstraintFunctions");
const ReacuringShiftsFunctions_1 = require("../dal/ReacuringShifts/ReacuringShiftsFunctions");
const lodash_1 = __importDefault(require("lodash"));
class shiftMaster {
    constructor() {
        this.logics = [new logic_1.NightShiftLogic(), new logic_1.NearestShiftLogic(), new logic_1.NoSameDayLogic()];
    }
    solve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sortShiftsByAvgScore();
            if (yield this.backtrack(0)) {
                console.log("All shifts have been successfully assigned.");
                return this.nextShiftBoard.shifts;
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
            for (const user of currentShift.availableUsers) {
                //copy shiftboard
                let prevboard = lodash_1.default.cloneDeep(this.nextShiftBoard);
                user.justicePoints = this.calculateNextJustice(user, currentShift);
                currentShift.user_taken = user;
                currentShift.is_filled = true;
                user.justicePoints = this.calculateNextJustice(user, currentShift);
                this.nextShiftBoard.sortUsersForAllShifts();
                for (let logic of this.logics) {
                    logic.applyLogic(user, this.nextShiftBoard, currentShift);
                }
                if (yield this.backtrack(index + 1)) {
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
            var users = yield (0, userFunctions_1.getAllUsers)();
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
            try {
                // Retrieve data in parallel
                const [constraints, recurringShifts, preferences] = yield Promise.all([
                    (0, ConstraintFunctions_1.getAllConstraints)(startDate, endDate, true),
                    (0, ReacuringShiftsFunctions_1.getAllRecurringShifts)(),
                    (0, PreferenceFunctions_1.getAllPreferences)()
                ]);
                this.nextShiftBoard = new shiftBoard_1.shiftBoard(recurringShifts, this.usersToShift, constraints, preferences, startDate, endDate);
            }
            catch (error) {
                console.error('Error initializing shifts:', error);
            }
        });
    }
}
exports.shiftMaster = shiftMaster;
