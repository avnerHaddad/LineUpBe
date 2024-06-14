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
exports.shiftFactory = void 0;
const shift_1 = require("./shift");
const userFunctions_1 = require("../dal/User/userFunctions");
function shiftFactory(shifts, users) {
    return __awaiter(this, void 0, void 0, function* () {
        //create a map between shiftJobTypes and UserswithThatJob
        const shiftsToJobs = new Map();
        const Newshifts = [];
        //go over all shifts
        for (const reacuringShift of shifts) {
            let nextShift = new shift_1.shift(reacuringShift, users);
            if (!shiftsToJobs.has(nextShift.jobId)) {
                shiftsToJobs.set(nextShift.jobId, (yield (0, userFunctions_1.getUsersWithJob)(nextShift.jobId)).map(user => user.id));
                //filter users that dont hace id set in shifttojobs
                nextShift.availableUsers.filter(user => {
                    // @ts-ignore
                    return shiftsToJobs.get(nextShift.jobId).includes(user.id);
                });
            }
            else {
                nextShift.availableUsers.filter(user => {
                    // @ts-ignore
                    return shiftsToJobs.get(nextShift.jobId).includes(user.id);
                });
            }
            Newshifts.push(nextShift);
        }
        return Newshifts;
    });
}
exports.shiftFactory = shiftFactory;
