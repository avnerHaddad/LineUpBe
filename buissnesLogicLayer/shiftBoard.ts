import { Constraint, ReacuringShift, Preference } from '../dal/models';
import { day } from "./day";
import { shift } from './shift';
import { user } from "./user";

export class shiftBoard {
  //days: day[]
  shifts: shift[]

  constructor(ReacuringShifts : ReacuringShift[], usersToShift: user[], constraints: Constraint[], Preferences: Preference[], startDate: Date, endDate: Date) {
    this.shifts = [];
    this.initilasliseShifts(ReacuringShifts, usersToShift, constraints, Preferences);
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

   initilasliseShifts(ReacuringShifts : ReacuringShift[], usersToShift: user[], constraints: Constraint[], Preferences: Preference[]) {
    for (let Reshift of ReacuringShifts) {
      this.shifts.push(new shift(Reshift, usersToShift));
    }
    //go over all shifts, if a shifts date is in the range of the constraint start and end time remove the user assigned to the constraint from the shift possible users list
    for (let shift of this.shifts) {
      for (let constraint of constraints) {
        if (this.isDateInRange(shift.date, constraint.startat, constraint.endat)) {
          shift.removeUserById(constraint.userid);
        }
      }
    }
    //go over all preferences and for each shift with the id of the preference shiftid call the add preference function
    for (let preference of Preferences) {
      for (let shift of this.shifts) {
        if (preference.shift_id === shift.shiftId) {
          shift.addPreference(preference.user_id, preference.preference);
        }
      }
    }

}

    getShiftsForUser(userId: number): shift[] {
    return this.shifts.filter(shift => shift.availableUsers.some(user => user.id === userId));
    }

   isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
}

    getshiftsByWeekday(weekday: number): shift[] {
        return this.shifts.filter(shift => shift.weekday === weekday);
    }

    sortUsersForAllShifts() {
        for (var shift of this.shifts) {
            shift.sortUsers();
        }
    }

    getNextShift(shift: shift): shift {
        //if shift type is night return the morning shift og the next day
        //if shift type is evening return the night shift of the same day
        //if shift type is morning return the evening shift of the same day
        if (shift.type === 'night') {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'morning')!;
        }
        else if (shift.type === 'evening') {
            return this.shifts.find(s => s.weekday === shift.weekday + 1 && s.type === 'night')!;
        }
        else {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'evening')!;
        }
    }
    getPrevShift(shift: shift): shift {
        //if shift type is night return the evening shift of the same day
        //if shift type is evening return the morning shift of the same day
        //if shift type is morning return the night shift of the previous day
        if (shift.type === 'night') {
            return this.shifts.find(s => s.weekday === shift.weekday -1 && s.type === 'evening')!;
        }
        else if (shift.type === 'evening') {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'morning')!;
        }
        else {
            return this.shifts.find(s => s.weekday === shift.weekday && s.type === 'night')!;
        }
    }




}