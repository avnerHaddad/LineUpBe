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
const pool = require('../db');
const UserQueries_1 = require("./UserQueries");
function FetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(UserQueries_1.getUserInfo, [username]);
        return rows;
    });
}
exports.FetchUser = FetchUser;
function getUserShiftCount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobRes = yield pool.query(UserQueries_1.getUserJobsQuery, [username]);
        // @ts-ignore
        const jobIds = jobRes.rows.map(row => row.job_id);
        if (jobIds.length === 0) {
            return 0;
        }
        const shiftRes = yield pool.query(UserQueries_1.getUserShiftCountQuery, [jobIds]);
        return parseInt(shiftRes.rows[0].shift_count, 10);
    });
}
exports.getUserShiftCount = getUserShiftCount;
function getUserUsedPoints(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query(UserQueries_1.getUserUsedPointsQuery, [username]);
        return parseInt(res.rows[0].total_points, 10);
    });
}
exports.getUserUsedPoints = getUserUsedPoints;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(UserQueries_1.getAllUsersQuery);
        return rows;
    });
}
exports.getAllUsers = getAllUsers;
