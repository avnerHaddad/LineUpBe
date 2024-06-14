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
exports.getShiftsByDate = exports.getShifts = void 0;
const readerFunctions_1 = require("../dal/readerFunctions");
const config_1 = require("../config/config");
const getShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const option = req.query.option;
        if (option === undefined) {
            throw new Error("Option parameter is missing");
        }
        try {
            const recurringShifts = yield (0, readerFunctions_1.getRecurringShiftsByJobType)(option);
            res.json(recurringShifts);
        }
        catch (error) {
            throw error;
        }
    }
    catch (error) {
        console.error("Error fetching shifts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getShifts = getShifts;
const getShiftsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = parseDate(req.query.startDate);
        const endDate = parseDate(req.query.endDate);
        const option = req.query.option;
        if (!option) {
            throw new Error("Option parameter is missing");
        }
        if (!startDate || !endDate) {
            res.status(400).json({ error: "Start date and end date are required" });
            return;
        }
        const shifts = yield (0, readerFunctions_1.FetchShiftsByDate)(startDate, endDate, option);
        const formattedShifts = shifts.map(formatShift);
        res.json(formattedShifts);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getShiftsByDate = getShiftsByDate;
function parseDate(dateString) {
    return dateString ? new Date(dateString) : undefined;
}
function formatShift(shift) {
    const shiftDay = shift.shift_day ? config_1.daysOfWeek[parseInt(shift.shift_day)] : "";
    return Object.assign(Object.assign({}, shift), { shift_day: shiftDay });
}
//# sourceMappingURL=menuController.js.map