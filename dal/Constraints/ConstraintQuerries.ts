export const getAllConstraintsQuery = `
      SELECT * FROM Constraints
      WHERE startAt >= $1
      AND endAt <= $2
      AND isconfirmed = $3
    `;

export const addConstraintQuery = `
INSERT INTO constraints (user_id, startat, endat, isconfirmed)
VALUES ($1, $2, $3, false)
    `;

export const confirmConstraintQuery = `
      UPDATE Constraints
      SET isconfirmed = true
      WHERE constraint_id = $1;
    `