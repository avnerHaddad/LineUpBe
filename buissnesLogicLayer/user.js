"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
class user {
    constructor(username, justicePoints, minShifts, jobs) {
        this.scoreWithShift = {};
        this.username = username;
        this.justicePoints = justicePoints;
        this.minShifts = minShifts;
        this.jobs = jobs;
    }
}
exports.user = user;
