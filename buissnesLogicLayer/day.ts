import { shift } from "./shift";
export class day {
  shifts: shift[];
  date: Date;

  constructor(date: Date) {
    this.date = date;
    this.shifts = [];
  }

  getShifts() {
    return this.shifts;
  }
}
