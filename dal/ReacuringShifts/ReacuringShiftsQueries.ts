export const getAllRecurringShiftsQuery = `SELECT * FROM CurrentRecurringShifts`

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