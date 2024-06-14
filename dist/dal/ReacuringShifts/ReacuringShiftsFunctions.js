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
exports.getRecurringShiftsByJobType = exports.getCurrentRecurringShiftsByJobTypes = exports.getAllRecurringShifts = void 0;
const pool = require('../db');
const ReacuringShiftsQueries_1 = require("./ReacuringShiftsQueries");
function getAllRecurringShifts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(ReacuringShiftsQueries_1.getAllRecurringShiftsQuery);
        return rows;
    });
}
exports.getAllRecurringShifts = getAllRecurringShifts;
function getCurrentRecurringShiftsByJobTypes(jobTypes) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(ReacuringShiftsQueries_1.getReacuringShiftsByJobs, [jobTypes]);
        return rows;
    });
}
exports.getCurrentRecurringShiftsByJobTypes = getCurrentRecurringShiftsByJobTypes;
function getRecurringShiftsByJobType(jobType) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(ReacuringShiftsQueries_1.getReacuringShiftsByJob, [jobType]);
        return rows;
    });
}
exports.getRecurringShiftsByJobType = getRecurringShiftsByJobType;
