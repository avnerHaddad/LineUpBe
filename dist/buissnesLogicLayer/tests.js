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
exports.CreateNextWeekShifts = void 0;
//main
const shiftMaster_1 = require("./shiftMaster");
const ShiftFunctions_1 = require("../dal/Shifts/ShiftFunctions");
function CreateNextWeekShifts(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const shiftMasterInstance = new shiftMaster_1.shiftMaster();
        yield shiftMasterInstance.initialiseUsers(startDate, endDate);
        yield shiftMasterInstance.initialiseShifts(startDate, endDate);
        let shifts = yield shiftMasterInstance.solve();
        // @ts-ignore
        yield (0, ShiftFunctions_1.writeShifts)(startDate, endDate, shifts);
    });
}
exports.CreateNextWeekShifts = CreateNextWeekShifts;
