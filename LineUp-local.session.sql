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