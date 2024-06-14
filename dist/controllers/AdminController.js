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
exports.createNextWeekShifts = exports.confirmConstraint = exports.getAllUnConfirmedConstraints = void 0;
const ConstraintFunctions_1 = require("../dal/Constraints/ConstraintFunctions");
const config_1 = require("../config/config");
const tests_1 = require("../buissnesLogicLayer/tests");
const getAllUnConfirmedConstraints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const constraints = yield (0, ConstraintFunctions_1.getAllConstraints)(config_1.initDate, new Date(), false);
        return res.json(constraints);
    }
    catch (error) {
        console.log("error while getting unconfirmed constraints: " + error);
        return res.json({ message: "Error while getting unconfirmed constraints!" });
    }
});
exports.getAllUnConfirmedConstraints = getAllUnConfirmedConstraints;
const confirmConstraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { constraint_id } = req.body;
    try {
        yield (0, ConstraintFunctions_1.confirmConstraintDb)(constraint_id);
        return res.json({ message: "Constraint confirmed!" });
    }
    catch (error) {
        console.log("error while confirming constraint: " + error);
        return res.json({ message: "Error while confirming constraint!" });
    }
});
exports.confirmConstraint = confirmConstraint;
const createNextWeekShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //set start date to next sunday and end date to next saturday
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + (7 - startDate.getDay()));
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()) + 7);
        yield (0, tests_1.CreateNextWeekShifts)(startDate, endDate);
        return res.json({ message: "Next week shifts created!" });
    }
    catch (error) {
        console.log("error while creating next week shifts: " + error);
        return res.json({ message: "Error while creating next week shifts!" });
    }
});
exports.createNextWeekShifts = createNextWeekShifts;
