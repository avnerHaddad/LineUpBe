//gets all of the current reacuring shifts for a specific job, used for pref menu
export const getReacuringShiftsByJob = `
        SELECT s.id, s.shiftDay, j.jobtype, to_char(s.shiftStartHour, 'HH24:MI') AS shiftStartHour,
        to_char(s.shiftEndHour, 'HH24:MI') AS shiftEndHour 
        FROM CurrentRecurringShifts s
        INNER JOIN "jobs" j ON j.id = s.shiftjobid
        WHERE j.jobType = $1
        `;

//gets all of the current reacuring shifts for a specific job, used for pref menu
export const getReacuringShiftsByJobs = `
SELECT id, shiftDay, shiftJobType, shiftStartHour, shiftEndHour
FROM CurrentRecurringShifts
WHERE shiftJobType = $1
`;

//gets shifts between 2 dates with a specified job, used for main menu
export const GetShiftsByDateAndJob = `
        SELECT
          Shifts.id,
          Shifts.shiftStartTime,
          Shifts.shiftEndTime,
          Jobs.jobType,
          Users.username,
          EXTRACT(DOW FROM shiftStartTime) AS shift_day,
          EXTRACT(HOUR FROM shiftStartTime) AS start_hour,
          EXTRACT(HOUR FROM shiftEndTime) AS end_hour
        FROM
          Shifts
        JOIN
          Jobs ON Shifts.job_id = Jobs.id
        JOIN
          Users ON Shifts.user_id = Users.id
        WHERE
          Shifts.shiftStartTime >= $1 AND Shifts.shiftEndTime <= $2 AND Jobs.jobType = $3
        `;

//gets all jobs of a scpefic user
export const getUserJobs = `
        SELECT j.id, j.jobType, j.user_id, j.minShiftPerWeek, j.maxShiftPerWeek, j.startDate, j.endDate
        FROM Jobs j
        INNER JOIN Users u ON j.user_id = u.id
        WHERE u.username = $1
    `;

export const getUserInfo = `
SELECT id, username, created_at, is_admin
FROM users
WHERE username = $1;
`;
