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
export interface User {
  id: number;
  username: string;
  currentPoints: number;
  //maybe shifts that user takes/took
  //maybe all of his preferences
  //link to his picture
  //all of his constraints
}
export interface Constraint {
  userid: number;
  startat: Date;
  endat: Date;
  isconfiremd?: boolean;
}

