import { shift } from "./shift";
export class day {
  shifts: shift[];
  day: number;

  constructor(day: number) {
    this.day = day;
    this.shifts = [];
  }

  getShifts() {
    return this.shifts;
  }
}
