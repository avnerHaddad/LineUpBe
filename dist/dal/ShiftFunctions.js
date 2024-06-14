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
const db_1 = require("./db");
const querries_1 = require("./querries");
function FetchShiftsByDate(StartDate, EndDate, jobType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rows } = yield db_1.pool.query(querries_1.GetShiftsByDateAndJob, [StartDate, EndDate, jobType]);
            console.log(rows);
            return rows;
        }
        catch (error) {
            ``;
            console.error("Error fetching shifts by date:", error);
            throw error;
        }
    });
}
exports.FetchShiftsByDate = FetchShiftsByDate;
function fetchShiftsByDateOnly(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rows } = yield db_1.pool.query(querries_1.getShiftsByDates, [startDate, endDate]);
            return rows;
        }
        catch (error) {
            console.error("Error fetching shifts by date:", error);
            throw error;
        }
    });
}
exports.fetchShiftsByDateOnly = fetchShiftsByDateOnly;
function writeShifts(startDate, endDate, shifts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const client = yield db_1.pool.connect();
        try {
            yield client.query('BEGIN');
            yield client.query('DELETE FROM shifts WHERE shiftstarttime >= $1 AND shiftstarttime <= $2', [startDate, endDate]);
            for (const shift of shifts) {
                yield client.query('INSERT INTO shifts (user_id, shiftstarttime, shiftendtime) VALUES ($1, $2, $3)', [(_a = shift.user_taken) === null || _a === void 0 ? void 0 : _a.id, shift.date, shift.endDate]);
            }
            yield client.query('COMMIT');
        }
        catch (error) {
            yield client.query('ROLLBACK');
            console.error('Error writing shifts:', error);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.writeShifts = writeShifts;
