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
exports.getAllConfirmedConstraints = exports.addConstraint = void 0;
const db_1 = require("../db");
function addConstraint(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userid, startat, endat }) {
        {
            const client = yield db_1.pool.connect();
            try {
                const query = `
                INSERT INTO constraints (user_id, startat, endat, isconfirmed)
                VALUES ($1, $2, $3, false)
            `;
                const values = [userid, startat, endat];
                yield client.query(query, values);
                console.log('Constraint added successfully');
            }
            catch (error) {
                console.error('Error adding Constraint:', error);
                throw error;
            }
            finally {
                client.release();
                return 1;
            }
        }
    });
}
exports.addConstraint = addConstraint;
function getAllConfirmedConstraints(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      SELECT * FROM Constraints
      WHERE isConfirmed = true
      AND startAt >= $1
      AND endAt <= $2;
    `;
            const { rows } = yield db_1.pool.query(query, [startDate, endDate]);
            return rows;
        }
        catch (error) {
            console.error("Error fetching confirmed constraints:", error);
            throw error;
        }
    });
}
exports.getAllConfirmedConstraints = getAllConfirmedConstraints;
