"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeShiftsQuery = exports.getShiftsByDates = exports.GetShiftsByDateAndJob = void 0;
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
          Jobs ON Shifts.job_id = Jobs.id
        JOIN
          Users ON Shifts.user_id = Users.id
        WHERE
          Shifts.shiftStartTime >= $1 AND Shifts.shiftEndTime <= $2 AND Jobs.jobType = $3
        `;
exports.getShiftsByDates = `
        SELECT
          Shifts.id,
          Shifts.shiftStartTime,
          Shifts.shiftEndTime,
          Users.username,
          EXTRACT(DOW FROM shiftStartTime) AS shift_day,
          EXTRACT(HOUR FROM shiftStartTime) AS start_hour,
          EXTRACT(HOUR FROM shiftEndTime) AS end_hour
        FROM
          Shifts
        JOIN
          Users ON Shifts.user_id = Users.id
        WHERE
          Shifts.shiftStartTime >= $1 AND Shifts.shiftEndTime <= $2
        `;
exports.writeShiftsQuery = 'INSERT INTO shifts (user_id, shiftstarttime, shiftendtime) VALUES ($1, $2, $3)';
