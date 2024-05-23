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
exports.removePreferencesByUserId = void 0;
const db_1 = require("./db");
function removePreferencesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.pool.connect();
        try {
            const query = 'DELETE FROM Preferences WHERE user_id = $1';
            const result = yield client.query(query, [userId]);
            console.log(`Removed ${result.rowCount} preference(s) for user ID ${userId}`);
        }
        catch (error) {
            console.error('Error removing preferences:', error);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.removePreferencesByUserId = removePreferencesByUserId;
