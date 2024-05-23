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
exports.setConstraint = exports.resetPrefs = exports.calculateFreePoints = exports.setPrefs = exports.getUserJobs = exports.getPossibleShifts = void 0;
const DeleterFunctions_1 = require("../dal/DeleterFunctions");
const WriterFunctions_1 = require("../dal/WriterFunctions");
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
const setPrefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { preference, shiftId, userid } = req.body;
    (0, WriterFunctions_1.addPreference)({ userid, shiftId, preference });
    console.log(userid + ": " + shiftId + ": " + preference);
    return res.json({ message: "Updated Pref!" });
    //update the user info in the client
});
exports.setPrefs = setPrefs;
const calculateFreePoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    var totalPoints = (yield (0, readerFunctions_1.getUserShiftCount)(username)) * 5;
    var usedPoints = yield (0, readerFunctions_1.getUserUsedPoints)(username);
    console.log(username + ": " + totalPoints);
    return res.json({ PontsLeft: totalPoints - usedPoints });
});
exports.calculateFreePoints = calculateFreePoints;
const resetPrefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = parseInt(req.body.userid);
    try {
        (0, DeleterFunctions_1.removePreferencesByUserId)(userid);
        return res.json({ message: "Succefully rested prefs" });
    }
    catch (error) {
        console.log("error while reseting prefs: " + error);
    }
});
exports.resetPrefs = resetPrefs;
const setConstraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { startat, endat, userid } = req.body;
    (0, WriterFunctions_1.addConstraint)({ userid, startat, endat });
    console.log(userid + ": " + startat + ": " + endat);
    return res.json({ message: "Created Constraint!" });
    //update the user info in the client
});
exports.setConstraint = setConstraint;
