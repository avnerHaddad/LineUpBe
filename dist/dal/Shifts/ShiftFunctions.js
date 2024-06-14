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
exports.writeShifts = exports.fetchShiftsByDateOnly = exports.FetchShiftsByDate = void 0;
const pool = require('../db');
const ShiftsQueries_1 = require("./ShiftsQueries");
function FetchShiftsByDate(StartDate, EndDate, jobType) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(ShiftsQueries_1.GetShiftsByDateAndJob, [StartDate, EndDate, jobType]);
        return rows;
    });
}
exports.FetchShiftsByDate = FetchShiftsByDate;
function fetchShiftsByDateOnly(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(ShiftsQueries_1.getShiftsByDates, [startDate, endDate]);
        return rows;
    });
}
exports.fetchShiftsByDateOnly = fetchShiftsByDateOnly;
function writeShifts(startDate, endDate, shifts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield pool.query('BEGIN');
        for (const shift of shifts) {
            yield pool.query(ShiftsQueries_1.writeShiftsQuery, [(_a = shift.user_taken) === null || _a === void 0 ? void 0 : _a.id, shift.date, shift.endDate]);
        }
        yield pool.query('COMMIT');
    });
}
exports.writeShifts = writeShifts;
