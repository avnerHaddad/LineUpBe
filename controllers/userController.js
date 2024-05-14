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
exports.getUserJobs = exports.getPossibleShifts = void 0;
const readerFunctions_1 = require("../dal/readerFunctions");
const getPossibleShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //gets all shifts the user can work on
    var userjobs = yield (0, readerFunctions_1.getJobsByUser)("user1");
    const jobTypes = userjobs.map((job) => job.jobtype);
    const shifts = yield (0, readerFunctions_1.getCurrentRecurringShiftsByJobTypes)(jobTypes);
    return res.json(shifts);
});
exports.getPossibleShifts = getPossibleShifts;
const getUserJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var userjobs = yield (0, readerFunctions_1.getJobsByUser)("user1");
    return res.json(userjobs);
});
exports.getUserJobs = getUserJobs;
