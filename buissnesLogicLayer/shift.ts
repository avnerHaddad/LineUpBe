import { jobEnum } from "./job";
import { user } from "./user";
import { shiftBoard } from "./shiftBoard";
import {ReacuringShift, User} from '../dal/models';
import { Preferance } from "./Preference";
import {TIme} from "./Time";
import {daysOfWeek} from "../config/config";
import {getUsersByJobQuery} from "../dal/User/UserQueries";
import {getUsersWithJob} from "../dal/User/userFunctions";

export class shift {
  is_filled!: boolean;
  user_taken!: user | null;
  //a way to connect it with the user score he gave it
  jobId!: number; // make enum later
  shiftId!: number;
  avgScore!: number;
  availableUsers!: user[];
  weekday!: number;
  date!: Date;
  endDate!: Date;
  userPreferences!: Map<number, number>; // Map of user IDs to preference scores
  startHour!: TIme;
  endHour!: TIme;
  type!: string;

  constructor(
    ReacuringShift: ReacuringShift,
    users: user[],
  ) {
      this.is_filled = false;
      this.jobId = Number(ReacuringShift.shiftJobType);
      this.shiftId = ReacuringShift.id;
      this.avgScore = 0;
      this.startHour = new TIme(ReacuringShift.shiftstarthour);
      this.endHour = new TIme(ReacuringShift.shiftendhour);
      console.log(ReacuringShift.shiftday)
      this.weekday = this.weekdayToNumber(ReacuringShift.shiftday) // Convert the weekday to a number
      this.date = this.getNextDayOfWeek(ReacuringShift.shiftday);
      //set endDate to this.date and add 8 hours
      this.endDate = new Date(this.date);
      this.endDate.setHours(this.endDate.getHours() + 8);


      this.userPreferences = new Map<number, number>(); // Initialize the map
      this.availableUsers = users
      this.type = this.getShiftType();
        this.initializePreferences();
  }

  weekdayToNumber(weekday: string): number {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays.indexOf(weekday);
  }




  getShiftType(): string{
    //get type by start hour
    //make this configurable in the future
    if (this.startHour.hours === 0){
      return "night";
    }
    else if (this.startHour.hours === 8){
      return "morning";
    }
    else{
      return "evening";
    }
  }

  getNextDayOfWeek(dayOfWeek: string): Date {
      const targetDayIndex = daysOfWeek.indexOf(dayOfWeek);
    if (targetDayIndex === -1) {
      console.log(dayOfWeek)
      throw new Error("Invalid day of the week");
    }

    // Get today's date
    const today = new Date();

    // Get today's day index
    const todayIndex = today.getDay();

    // Calculate the number of days until the next occurrence of the target day
    const daysUntilNext = (targetDayIndex + 7 - todayIndex) % 7 || 7;

    // Calculate the date of the next occurrence
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext);
    nextDate.setHours(this.startHour.hours, this.startHour.minutes, 0, 0)

    return nextDate;
  }


  removeUserById(userId: number): void {
    this.availableUsers = this.availableUsers.filter(user => user.id !== userId);
    this.userPreferences.delete(userId); // Remove user preference if user is removed
  }

  addPreference(userId: number, preference: number): void {
    //add preference to current value
    this.userPreferences.set(userId, this.userPreferences.get(userId)! + preference);
  }
  initializePreferences(): void
    {
        for (let user of this.availableUsers) {
        this.userPreferences.set(user.id, 40);
        }
    }

  private updateAvgScore(): void {
    if (this.userPreferences.size === 0) {
      this.avgScore = 0;
      return;
    }

    const totalScore = Array.from(this.userPreferences.values()).reduce((acc, score) => acc + score, 0);
    this.avgScore = totalScore / this.userPreferences.size;
  }

  sortUsers(): void {
    for(let user of this.availableUsers) {
      // Sort the availableUsers list based on the value of the users' ID preference in the userPreferences map and the users totalJustice combined
        this.availableUsers.sort((a, b) => {
            return (this.userPreferences.get(a.id)! + a.justicePoints) - (this.userPreferences.get(b.id)! + b.justicePoints);
        });




    }
  }

  shiftUser(user: user): void {
    this.is_filled = true;
    this.user_taken = user;
    this.availableUsers = this.availableUsers.filter(u => u.id!== user.id);
  }
  
}
