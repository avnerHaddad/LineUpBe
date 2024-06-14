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
exports.getAllUsers = exports.getUserUsedPoints = exports.getUserShiftCount = exports.FetchUser = void 0;
const querries_1 = require("./querries");
const db_1 = require("./db");
function FetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rows } = yield db_1.pool.query(querries_1.getUserInfo, [username]);
            return rows;
        }
        catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    });
}
exports.FetchUser = FetchUser;
function getUserShiftCount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryUserJobs = `
      SELECT job_id
      FROM jobs_to_users
      INNER JOIN users ON jobs_to_users.user_id = users.id
      WHERE users.username = $1;
    `;
            const jobRes = yield db_1.pool.query(queryUserJobs, [username]);
            const jobIds = jobRes.rows.map(row => row.job_id);
            if (jobIds.length === 0) {
                return 0;
            }
            const queryShiftCount = `
      SELECT COUNT(*) AS shift_count
      FROM CurrentRecurringShifts
      WHERE shiftJobId = ANY($1::int[]);
    `;
            const shiftRes = yield db_1.pool.query(queryShiftCount, [jobIds]);
            const shiftCount = parseInt(shiftRes.rows[0].shift_count, 10);
            return shiftCount;
        }
        catch (error) {
            console.error("Error fetching user shift count:", error);
            throw error;
        }
    });
}
exports.getUserShiftCount = getUserShiftCount;
function getUserUsedPoints(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      SELECT COALESCE(SUM(Preferences.preference), 0) AS total_points
      FROM Preferences
      INNER JOIN users ON Preferences.user_id = users.id
      WHERE users.username = $1;
    `;
            const res = yield db_1.pool.query(query, [username]);
            const totalPoints = parseInt(res.rows[0].total_points, 10);
            return totalPoints;
        }
        catch (error) {
            console.error("Error fetching user used points:", error);
            throw error;
        }
    });
}
exports.getUserUsedPoints = getUserUsedPoints;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM Users`;
            const { rows } = yield db_1.pool.query(query);
            return rows;
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    });
}
exports.getAllUsers = getAllUsers;
