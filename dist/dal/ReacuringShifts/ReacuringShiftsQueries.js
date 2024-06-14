"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReacuringShiftsByJobs = exports.getReacuringShiftsByJob = exports.getAllRecurringShiftsQuery = void 0;
exports.getAllRecurringShiftsQuery = `SELECT * FROM CurrentRecurringShifts`;
//gets all of the current reacuring shifts for a specific job, used for pref menu
exports.getReacuringShiftsByJob = `
        SELECT s.id, s.shiftDay, j.jobtype, to_char(s.shiftStartHour, 'HH24:MI') AS shiftStartHour,
        to_char(s.shiftEndHour, 'HH24:MI') AS shiftEndHour 
        FROM CurrentRecurringShifts s
        INNER JOIN "jobs" j ON j.id = s.shiftjobid
        WHERE j.jobType = $1
        `;
//gets all of the current reacuring shifts for a specific job, used for pref menu
exports.getReacuringShiftsByJobs = `
SELECT id, shiftDay, shiftJobType, shiftStartHour, shiftEndHour
FROM CurrentRecurringShifts
WHERE shiftJobType = $1
`;
