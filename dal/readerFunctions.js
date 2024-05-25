"use strict";
//get all preferences function
//get all users function
//get all constraints function
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
exports.getAllRecurringShifts = exports.getAllPreferences = exports.getAllUsers = exports.getAllConfirmedConstraints = exports.getUserUsedPoints = exports.getUserShiftCount = exports.FetchUser = exports.FetchShiftsByDate = exports.getCurrentRecurringShiftsByJobTypes = exports.getJobsByUser = exports.getRecurringShiftsByJobType = void 0;
const querries_1 = require("./querries");
const db_1 = require("./db");
function getRecurringShiftsByJobType(jobType) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        // Create a PostgreSQL pool
        try {
            const { rows } = yield client.query(querries_1.getReacuringShiftsByJob, [jobType]);
            return rows;
        }
        catch (error) {
            console.error("Error fetching recurring shifts:", error);
            throw error;
        }
        finally {
            // Close the pool to release all resources
            client.release(); // Release the client back to the pool
        }
    });
}
exports.getRecurringShiftsByJobType = getRecurringShiftsByJobType;
function getJobsByUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            // Connect to the database
            const { rows } = yield client.query(querries_1.getUserJobs, [
                username,
            ]);
            return rows;
        }
        catch (error) {
            console.error("Error fetching jobs by user:", error);
            throw error;
        }
        finally {
            client.release(); //
        }
    });
}
exports.getJobsByUser = getJobsByUser;
function getCurrentRecurringShiftsByJobTypes(jobTypes) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const { rows } = yield client.query(querries_1.getReacuringShiftsByJobs, [jobTypes]);
            return rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getCurrentRecurringShiftsByJobTypes = getCurrentRecurringShiftsByJobTypes;
function FetchShiftsByDate(StartDate, EndDate, jobType) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        console.log("Fetching" + jobType + " jobs by date" + " " + StartDate + "-" + EndDate);
        try {
            const { rows } = yield client.query(querries_1.GetShiftsByDateAndJob, [StartDate, EndDate, jobType]);
            console.log(rows);
            return rows;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.FetchShiftsByDate = FetchShiftsByDate;
function FetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const { rows } = yield client.query(querries_1.getUserInfo, [username]);
            return rows;
        }
        finally {
            client.release();
        }
    });
}
exports.FetchUser = FetchUser;
function getUserShiftCount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const queryUserJobs = `
      SELECT job_id
      FROM jobs_to_users
      INNER JOIN users ON jobs_to_users.user_id = users.id
      WHERE users.username = $1;
    `;
            const jobRes = yield client.query(queryUserJobs, [username]);
            const jobIds = jobRes.rows.map(row => row.job_id);
            if (jobIds.length === 0) {
                return 0;
            }
            const queryShiftCount = `
      SELECT COUNT(*) AS shift_count
      FROM CurrentRecurringShifts
      WHERE shiftJobId = ANY($1::int[]);
    `;
            const shiftRes = yield client.query(queryShiftCount, [jobIds]);
            const shiftCount = parseInt(shiftRes.rows[0].shift_count, 10);
            return shiftCount;
        }
        catch (err) {
            console.error('Error fetching user shift count:', err);
            return 0;
        }
        finally {
            yield client.release();
        }
    });
}
exports.getUserShiftCount = getUserShiftCount;
function getUserUsedPoints(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const query = `
      SELECT COALESCE(SUM(Preferences.preference), 0) AS total_points
      FROM Preferences
      INNER JOIN users ON Preferences.user_id = users.id
      WHERE users.username = $1;
    `;
            const res = yield client.query(query, [username]);
            const totalPoints = parseInt(res.rows[0].total_points, 10);
            return totalPoints;
        }
        catch (err) {
            console.error('Error fetching user used points:', err);
            return 0;
        }
        finally {
            yield client.release();
        }
    });
}
exports.getUserUsedPoints = getUserUsedPoints;
function getAllConfirmedConstraints(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const query = `
      SELECT * FROM Constraints
      WHERE isConfirmed = true
      AND startAt >= $1
      AND endAt <= $2;
    `;
            const { rows } = yield client.query(query, [startDate, endDate]);
            return rows;
        }
        catch (err) {
            console.error('Error fetching confirmed constraints:', err);
            return [];
        }
        finally {
            yield client.release();
        }
    });
}
exports.getAllConfirmedConstraints = getAllConfirmedConstraints;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const query = `
      SELECT * FROM Users
    `;
            const { rows } = yield client.query(query);
            return rows;
        }
        catch (err) {
            console.error('Error fetching users:', err);
            return 0;
        }
        finally {
            yield client.release();
        }
    });
}
exports.getAllUsers = getAllUsers;
function getAllPreferences() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const query = `
      SELECT * FROM Preferences;
    `;
            const { rows } = yield client.query(query);
            return rows;
        }
        catch (err) {
            console.error('Error fetching preferences:', err);
            return [];
        }
        finally {
            yield client.release();
        }
    });
}
exports.getAllPreferences = getAllPreferences;
function getAllRecurringShifts() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const query = `
      SELECT * FROM CurrentRecurringShifts;
    `;
            const { rows } = yield client.query(query);
            return rows;
        }
        catch (err) {
            console.error('Error fetching recurring shifts:', err);
            return [];
        }
        finally {
            yield client.release();
        }
    });
}
exports.getAllRecurringShifts = getAllRecurringShifts;
