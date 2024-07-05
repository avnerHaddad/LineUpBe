export interface ReacuringShift {
  id: number;
  shiftday: number;
  shiftjobid: string;
  shiftstarthour: string;
  shiftendhour: string;
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
export interface Preference {
  user_id: number;
  shift_id: number;
  preference: number;
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
  injustice: number;
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

