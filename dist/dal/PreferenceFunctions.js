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
exports.addPreference = exports.getAllPreferences = void 0;
const db_1 = require("./db");
function getAllPreferences() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM Preferences`;
            const { rows } = yield db_1.pool.query(query);
            return rows;
        }
        catch (error) {
            console.error("Error fetching preferences:", error);
            throw error;
        }
    });
}
exports.getAllPreferences = getAllPreferences;
function addPreference(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user_id, shift_id, preference }) {
        {
            const client = yield db_1.pool.connect();
            try {
                const query = `
      INSERT INTO Preferences (user_id, shift_id, preference)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, shift_id)
      DO UPDATE SET preference = EXCLUDED.preference;
    `;
                const values = [user_id, shift_id, preference];
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
