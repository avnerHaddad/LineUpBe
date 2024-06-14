export const addPrefQuery = `
      INSERT INTO Preferences (user_id, shift_id, preference)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, shift_id)
      DO UPDATE SET preference = EXCLUDED.preference;
    `;

export const deletePrefByUserIdQuery = 'DELETE FROM Preferences WHERE user_id = $1'

export const getAllPreferencesQuery = `SELECT * FROM Preferences`;