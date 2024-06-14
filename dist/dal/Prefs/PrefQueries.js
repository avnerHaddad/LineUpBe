"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPreferencesQuery = exports.deletePrefByUserIdQuery = exports.addPrefQuery = void 0;
exports.addPrefQuery = `
      INSERT INTO Preferences (user_id, shift_id, preference)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, shift_id)
      DO UPDATE SET preference = EXCLUDED.preference;
    `;
exports.deletePrefByUserIdQuery = 'DELETE FROM Preferences WHERE user_id = $1';
exports.getAllPreferencesQuery = `SELECT * FROM Preferences`;
