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
exports.setConstraint = exports.resetPrefs = exports.setPrefs = exports.calculateFreePoints = exports.getUserJobs = void 0;
const PreferenceFunctions_1 = require("../dal/Prefs/PreferenceFunctions");
const ConstraintFunctions_1 = require("../dal/Constraints/ConstraintFunctions");
const PreferenceFunctions_2 = require("../dal/Prefs/PreferenceFunctions");
const JobFunctions_1 = require("../dal/Jobs/JobFunctions");
const userFunctions_1 = require("../dal/User/userFunctions");
const config_1 = require("../config/config"); // Response from 'express';
const getUserJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.id)
        return res.status(400).json({ message: "User ID is required" });
    try {
        const user_id = parseInt(req.query.id);
        const user_jobs = yield (0, JobFunctions_1.getJobsByUser)(user_id);
        return res.json(user_jobs.map((job) => job.jobtype));
    }
    catch (error) {
        console.log("error while getting user jobs: " + error);
        return res.json({ message: "Error while getting user jobs!" });
    }
});
exports.getUserJobs = getUserJobs;
const calculateFreePoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.username)
        return res.status(400).json({ message: "Username is required" });
    const username = req.query.username;
    try {
        const totalPoints = (yield (0, userFunctions_1.getUserShiftCount)(username)) * config_1.ShiftToPoints;
        const usedPoints = yield (0, userFunctions_1.getUserUsedPoints)(username);
        return res.json({ PontsLeft: totalPoints - usedPoints });
    }
    catch (error) {
        console.log("error while calculating free points: " + error);
        return res.json({ message: "Error while calculating free points!" });
    }
});
exports.calculateFreePoints = calculateFreePoints;
const setPrefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { preference, shift_id, user_id } = req.body;
    try {
        yield (0, PreferenceFunctions_2.addPreference)({ user_id, shift_id, preference });
        return res.json({ message: "Updated Pref!" });
    }
    catch (error) {
        console.log("error while setting prefs: " + error);
        return res.json({ message: "Error while setting prefs!" });
    }
});
exports.setPrefs = setPrefs;
const resetPrefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = parseInt(req.body.userid);
        yield (0, PreferenceFunctions_1.removePreferencesByUserId)(userid);
        return res.json({ message: "Succefully rested prefs" });
    }
    catch (error) {
        console.log("error while reseting prefs: " + error);
        return res.json({ message: "Error while reseting prefs!" });
    }
});
exports.resetPrefs = resetPrefs;
const setConstraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startat, endat, userid } = req.body;
        (0, ConstraintFunctions_1.addConstraint)({ userid, startat, endat });
        console.log(userid + ": " + startat + ": " + endat);
        return res.json({ message: "Created Constraint!" });
    }
    catch (error) {
        console.log("error while setting constraint: " + error);
        return res.json({ message: "Error while setting constraint!" });
    }
});
exports.setConstraint = setConstraint;
