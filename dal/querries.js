"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserJobs = exports.GetShiftsByDateAndJob = exports.getReacuringShiftsByJobs = exports.getReacuringShiftsByJob = void 0;
//gets all of the current reacuring shifts for a specific job, used for pref menu
exports.getReacuringShiftsByJob = `
        SELECT s.id, s.shiftDay, s.shiftJobType, s.shiftStartHour, s.shiftEndHour
        FROM CurrentRecurringShifts s
        INNER JOIN "jobs" j ON j.JobType = s.shiftJobType
        WHERE j.jobType = ANY($1)
        `;
//gets all of the current reacuring shifts for a specific job, used for pref menu
exports.getReacuringShiftsByJobs = `
SELECT id, shiftDay, shiftJobType, shiftStartHour, shiftEndHour
FROM CurrentRecurringShifts
WHERE shiftJobType = $1
`;
//gets shifts between 2 dates with a specified job, used for main menu
exports.GetShiftsByDateAndJob = `
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
          Jobs ON Shifts.jobid = Jobs.id
        JOIN
          Users ON Jobs.user_id = Users.id
        WHERE
          Shifts.shiftStartTime >= $1 AND Shifts.shiftEndTime <= $2 AND Jobs.jobType = $3
        `;
//gets all jobs of a scpefic user
exports.getUserJobs = `
        SELECT j.id, j.jobType, j.user_id, j.minShiftPerWeek, j.maxShiftPerWeek, j.startDate, j.endDate
        FROM Jobs j
        INNER JOIN Users u ON j.user_id = u.id
        WHERE u.username = $1
    `;
