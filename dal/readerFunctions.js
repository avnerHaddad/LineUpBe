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
exports.FetchShiftsByDate = exports.getCurrentRecurringShiftsByJobTypes = exports.getJobsByUser = exports.getRecurringShiftsByJobType = void 0;
const pg_1 = require("pg");
const querries_1 = require("./querries");
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "LineUp",
    password: "postgres",
    port: 5432, // Default PostgreSQL port
});
function getRecurringShiftsByJobType(jobType) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
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
        const client = yield pool.connect();
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
        const client = yield pool.connect();
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
        const client = yield pool.connect();
        try {
            const { rows } = yield client.query(querries_1.GetShiftsByDateAndJob, [StartDate, EndDate, jobType]);
            return rows;
        }
        finally {
            client.release();
        }
    });
}
exports.FetchShiftsByDate = FetchShiftsByDate;
