import {user} from "./user";
import {ReacuringShift} from '../dal/models';
import {TIme} from "./Time";

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
  preference!: number;

  constructor(
    ReacuringShift: ReacuringShift,
    users: user[],
  ) {
      this.is_filled = false;
      this.jobId = Number(ReacuringShift.shiftjobid);
      this.shiftId = ReacuringShift.id;
      this.avgScore = 0;
      this.startHour = new TIme(ReacuringShift.shiftstarthour);
      this.endHour = new TIme(ReacuringShift.shiftendhour);
      console.log(ReacuringShift.shiftday)
      this.weekday = ReacuringShift.shiftday// Convert the weekday to a number
      this.date = this.getNextDayOfWeek(this.weekday);
      //set endDate to this.date and add 8 hours
      this.endDate = new Date(this.date);
      this.endDate.setHours(this.endDate.getHours() + 8);
      this.userPreferences = new Map<number, number>(); // Initialize the map
      this.availableUsers = users
      this.type = this.getShiftType();
        this.initializePreferences();
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

    getNextDayOfWeek(dayOfWeek: number): Date {
        let date = new Date();
        //set date to next sunday
        date.setDate(date.getDate() + (7 - date.getDay()));
        date.setDate(date.getDate() + dayOfWeek);
        //use this.startHour to set the hours
        date.setHours(this.startHour.hours);
        return date;
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
      this.preference = this.userPreferences.get(user.id)!;

  }

    unShiftUser(): void {
        this.is_filled = false;
        this.user_taken = null;
        this.preference = 0;
    }
  
}
