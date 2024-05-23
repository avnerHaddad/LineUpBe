import { Constraint, ReacuringShift, Preference } from '../dal/models';
import { day } from "./day";
import { shift } from "./shift";
import { user } from "./user";

export class shiftBoard {
  sunday: day;
  monday: day;
  tuesday: day;
  wednesday: day;
  thursday: day;
  friday: day;
  saturday: day;

  constructor(ReacuringShifts : Promise<ReacuringShift[]>, usersToShift: user[], constraints: Promise<Constraint[]>, Preferences: Promise<Preference[]>) {
    this.sunday = new day(1);
    this.monday = new day(2);
    this.tuesday = new day(3);
    this.wednesday = new day(4);
    this.thursday = new day(5);
    this.friday = new day(6);
    this.saturday = new day(7);
  }

  getAllShifts() {
    let allShifts: shift[] = [];
    allShifts = allShifts.concat(
      this.sunday.getShifts(),
      this.monday.getShifts(),
      this.tuesday.getShifts(),
      this.wednesday.getShifts(),
      this.thursday.getShifts(),
      this.friday.getShifts(),
      this.saturday.getShifts(),
    );
    return allShifts;
  }
}
