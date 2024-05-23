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
exports.addConstraint = exports.addPreference = void 0;
//update/create a prefernce(user, reacuring shift, score)
//create a reacuringshift(shift day, shift startHour, shiftEndHour, shift Jobtype)
//create a new user(username, password justicepoints)
//update a user information(userid, newusername, newpassword, newjusticepoints)
//create a constraint(start_time, end_time, user)
const db_1 = require("./db");
function addPreference(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userid, shiftId, preference }) {
        {
            const client = yield db_1.pool.connect();
            try {
                const query = `
      INSERT INTO Preferences (user_id, shift_id, preference)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, shift_id)
      DO UPDATE SET preference = EXCLUDED.preference;
    `;
                const values = [userid, shiftId, preference];
                yield client.query(query, values);
                console.log('Preference added successfully');
            }
            catch (error) {
                console.error('Error adding preference:', error);
                throw error;
            }
            finally {
                client.release();
                return 1;
            }
        }
    });
}
exports.addPreference = addPreference;
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
