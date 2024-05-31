import { Constraint, ReacuringShift, Preference } from '../dal/models';
import { day } from "./day";
import { shift } from './shift';
import { user } from "./user";

export class shiftBoard {
  //days: day[]
  shifts: shift[]

  constructor(ReacuringShifts : ReacuringShift[], usersToShift: user[], constraints: Constraint[], Preferences: Preference[], startDate: Date, endDate: Date) {
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

  async initilasliseShifts(ReacuringShifts : ReacuringShift[], usersToShift: user[], constraints: Promise<Constraint[]>, Preferences: Promise<Preference[]>) {
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
    //go over all preferences and for each shift with the id of the preference shiftid call the add preference function
    for (let preference of prefs) {
      for (let shift of this.shifts) {
        if (preference.shift_id === shift.shiftId) {
          shift.addPreference(preference.user_id, preference.preference);
        }
      }
    }
    for(let shift of this.shifts) {
      shift.sortUsers();
  }
}

  getAllShifts() {
    return this.shifts;
  }

   isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
}


}