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
const logic_1 = require("./logic");
const PreferenceFunctions_1 = require("../dal/Prefs/PreferenceFunctions");
const ConstraintFunctions_1 = require("../dal/Constraints/ConstraintFunctions");
const ReacuringShiftsFunctions_1 = require("../dal/ReacuringShifts/ReacuringShiftsFunctions");
const lodash_1 = __importDefault(require("lodash"));
const shiftFactory_1 = require("./shiftFactory");
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
            for (const user of currentShift.availableUsers) {
                //copy shiftboard
                let prevboard = lodash_1.default.cloneDeep(this.nextShiftBoard);
                let prevUsers = lodash_1.default.cloneDeep(this.usersToShift);
                user.justicePoints = this.calculateNextJustice(user, currentShift);
                currentShift.shiftUser(user);
                user.justicePoints = this.calculateNextJustice(user, currentShift);
                this.nextShiftBoard.sortUsersForAllShifts();
                for (let logic of this.logics) {
                    logic.applyLogic(user, this.nextShiftBoard, currentShift);
                }
                if (yield this.backtrack(index + 1)) {
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
    initialiseShifts(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve all users
                this.usersToShift = yield (0, shiftFactory_1.userFactory)();
                // Retrieve data in parallel
                const [constraints, recurringShifts, preferences] = yield Promise.all([
                    (0, ConstraintFunctions_1.getAllConstraints)(startDate, endDate, true),
                    (0, ReacuringShiftsFunctions_1.getAllRecurringShifts)(),
                    (0, PreferenceFunctions_1.getAllPreferences)()
                ]);
                let shifts = yield (0, shiftFactory_1.shiftFactory)(recurringShifts, this.usersToShift, constraints, preferences);
                this.nextShiftBoard = new shiftBoard_1.shiftBoard(shifts);
            }
            catch (error) {
                console.error('Error initializing shifts:', error);
            }
        });
    }
}
exports.shiftMaster = shiftMaster;
