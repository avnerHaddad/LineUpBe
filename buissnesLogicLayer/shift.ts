import { jobEnum } from "./job";
import { user } from "./user";
import { shiftBoard } from "./shiftBoard";
import { ReacuringShift } from '../dal/models';
import { Preferance } from "./Preference";

export class shift {
  is_filled: boolean;
  user_taken!: user;
  //a way to connect it with the user score he gave it
  job: string; // make enum later
  shiftId: number;
  avgScore: number;
  availableUsers: user[];
  weekday: string;
  date: Date;
  userPreferences: Map<number, number>; // Map of user IDs to preference scores

  constructor(
    ReacuringShift: ReacuringShift,
    users: user[],
  ) {
    this.is_filled = false;
    this.job = ReacuringShift.shiftJobType;
    this.shiftId = ReacuringShift.id;
    this.avgScore = 0;
    this.availableUsers = users;
    this.weekday = ReacuringShift.shiftDay;
    this.date = this.getNextDayOfWeek(ReacuringShift.shiftDay);
    this.userPreferences = new Map<number, number>(); // Initialize the map
  }

  getNextDayOfWeek(dayOfWeek: string): Date {
    // Array of days of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Convert the input day to the corresponding index
    const targetDayIndex = daysOfWeek.indexOf(dayOfWeek);
    if (targetDayIndex === -1) {
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

    return nextDate;
  }

  removeUserById(userId: number): void {
    this.availableUsers = this.availableUsers.filter(user => user.id !== userId);
    this.userPreferences.delete(userId); // Remove user preference if user is removed
  }

  addPreference(userId: number, preference: number): void {
    this.userPreferences.set(userId, preference);
    this.updateAvgScore(); // Update the average score whenever a new preference is added
  }

  private updateAvgScore(): void {
    if (this.userPreferences.size === 0) {
      this.avgScore = 0;
      return;
    }

    const totalScore = Array.from(this.userPreferences.values()).reduce((acc, score) => acc + score, 0);
    this.avgScore = totalScore / this.userPreferences.size;
  }
}
