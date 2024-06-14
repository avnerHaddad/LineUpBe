"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmConstraintQuery = exports.addConstraintQuery = exports.getAllConstraintsQuery = void 0;
exports.getAllConstraintsQuery = `
      SELECT * FROM Constraints
      WHERE startAt >= $1
      AND endAt <= $2
      AND isconfirmed = $3
    `;
exports.addConstraintQuery = `
INSERT INTO constraints (user_id, startat, endat, isconfirmed)
VALUES ($1, $2, $3, false)
    `;
exports.confirmConstraintQuery = `
      UPDATE Constraints
      SET isconfirmed = true
      WHERE constraint_id = $1;
    `;
