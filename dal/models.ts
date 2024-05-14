export interface ReacuringShift {
  id: number;
  shiftDay: string;
  shiftJobType: string;
  shiftStartHour: Date;
  shiftEndHour: Date;
}
export interface Shift {
  id: number;
  shiftStartTime: Date;
  shiftEndTime: Date;
  JobType: string;
  username: string;
  shift_day: string;
  shiftStartHour: string;
  shiftEndHour: string;
}
export interface Job {
  id: number;
  jobtype: string;
  user_id: number;
  minShiftPerWeek: number;
  maxShiftPerWeek: number;
  startDate: Date;
  endDate: Date;
}
