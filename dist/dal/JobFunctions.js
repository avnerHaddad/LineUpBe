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
exports.getJobsByUser = void 0;
const db_1 = require("./db");
const querries_1 = require("./querries");
function getJobsByUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rows } = yield db_1.pool.query(querries_1.getUserJobs, [username]);
            return rows;
        }
        catch (error) {
            console.error("Error fetching jobs by user:", error);
            throw error;
        }
    });
}
exports.getJobsByUser = getJobsByUser;
