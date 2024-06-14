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
exports.confirmConstraintDb = exports.getAllConstraints = exports.addConstraint = void 0;
const pool = require('../db');
const ConstraintQuerries_1 = require("./ConstraintQuerries");
function addConstraint(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userid, startat, endat }) {
        return yield pool.query(ConstraintQuerries_1.addConstraintQuery, [userid, startat, endat]);
    });
}
exports.addConstraint = addConstraint;
function getAllConstraints(startDate, endDate, isConfirmed) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query(ConstraintQuerries_1.getAllConstraintsQuery, [startDate, endDate, isConfirmed]);
        return rows;
    });
}
exports.getAllConstraints = getAllConstraints;
function confirmConstraintDb(constraintId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pool.query(ConstraintQuerries_1.confirmConstraintQuery, [constraintId]);
    });
}
exports.confirmConstraintDb = confirmConstraintDb;
