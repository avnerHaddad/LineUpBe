"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByJobQuery = exports.getUserJobsQuery = exports.getUserShiftCountQuery = exports.getUserInfo = exports.getUserUsedPointsQuery = exports.getAllUsersQuery = void 0;
exports.getAllUsersQuery = `SELECT users.*, user_injustice.injustice
                                 FROM users
                                          JOIN (
                                     SELECT user_id, SUM(preference) AS injustice
                                     FROM shifts
                                     GROUP BY user_id
                                 ) AS user_injustice ON users.id = user_injustice.user_id;`;
exports.getUserUsedPointsQuery = `
      SELECT COALESCE(SUM(Preferences.preference), 0) AS total_points
      FROM Preferences
      INNER JOIN users ON Preferences.user_id = users.id
      WHERE users.username = $1;
    `;
exports.getUserInfo = `
SELECT id, username, created_at, is_admin
FROM users
WHERE username = $1;
`;
exports.getUserShiftCountQuery = `
      SELECT COUNT(*) AS shift_count
      FROM CurrentRecurringShifts
      WHERE shiftJobId = ANY($1::int[]);
    `;
exports.getUserJobsQuery = `
      SELECT job_id
      FROM jobs_to_users
      INNER JOIN users ON jobs_to_users.user_id = users.id
      WHERE users.username = $1;
    `;
exports.getUsersByJobQuery = 'SELECT * FROM Users join jobs_to_users on Users.id = jobs_to_users.user_id join jobs on jobs_to_users.job_id = jobs.id where job_id = $1';
