export const getAllUsersQuery = `SELECT * FROM Users`;

export const getUserUsedPointsQuery = `
      SELECT COALESCE(SUM(Preferences.preference), 0) AS total_points
      FROM Preferences
      INNER JOIN users ON Preferences.user_id = users.id
      WHERE users.username = $1;
    `

export const getUserInfo = `
SELECT id, username, created_at, is_admin
FROM users
WHERE username = $1;
`;

export const getUserShiftCountQuery = `
      SELECT COUNT(*) AS shift_count
      FROM CurrentRecurringShifts
      WHERE shiftJobId = ANY($1::int[]);
    `;

export const getUserJobsQuery = `
      SELECT job_id
      FROM jobs_to_users
      INNER JOIN users ON jobs_to_users.user_id = users.id
      WHERE users.username = $1;
    `;