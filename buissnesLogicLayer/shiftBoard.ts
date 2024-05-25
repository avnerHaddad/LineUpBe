import { Constraint, ReacuringShift, Preference } from '../dal/models';
import { day } from "./day";
import { shift } from './shift';
import { user } from "./user";

export class shiftBoard {
  //days: day[]
  shifts: shift[]

  constructor(ReacuringShifts : Promise<ReacuringShift[]>, usersToShift: user[], constraints: Promise<Constraint[]>, Preferences: Promise<Preference[]>, startDate: Date, endDate: Date) {
    this.shifts = [];
    /*use an array of days, the length should be the endDate - startDate + 1, each day contains an array of shifts
    const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
            // Initialize the days array with empty shifts arrays
            this.days = Array.from({ length: daysCount }, (_, index) => {
                const date = new Date(startDate);
                date.setDate(date.getDate() + index);
                return new day(date);
            });

  }
  */
 }

  async initilasliseShifts(ReacuringShifts : Promise<ReacuringShift[]>, usersToShift: user[], constraints: Promise<Constraint[]>, Preferences: Promise<Preference[]>) {
    const [Reshifts, cons, prefs] = await Promise.all([ReacuringShifts, constraints, Preferences]);

    for (let Reshift of Reshifts) {
      this.shifts.push(new shift(Reshift, usersToShift));
    }
    //go over all shifts, if a shifts date is in the range of the constraint start and end time remove the user assigned to the constraint from the shift possible users list
    for (let shift of this.shifts) {
      for (let constraint of cons) {
        if (this.isDateInRange(shift.date, constraint.startat, constraint.endat)) {
          shift.removeUserById(constraint.userid);
        }
      }
    }

    
  }

   isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
}
  getAllShifts() {

    let allShifts: shift[] = [];

    for (let day of this.days) {
      allShifts = allShifts.concat(day.getShifts());
    }
    return allShifts;
  }
}
