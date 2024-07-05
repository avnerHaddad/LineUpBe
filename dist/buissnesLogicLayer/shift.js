"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shift = void 0;
const Time_1 = require("./Time");
class shift {
    constructor(ReacuringShift, users) {
        this.is_filled = false;
        this.jobId = Number(ReacuringShift.shiftjobid);
        this.shiftId = ReacuringShift.id;
        this.avgScore = 0;
        this.startHour = new Time_1.TIme(ReacuringShift.shiftstarthour);
        this.endHour = new Time_1.TIme(ReacuringShift.shiftendhour);
        console.log(ReacuringShift.shiftday);
        this.weekday = ReacuringShift.shiftday; // Convert the weekday to a number
        this.date = this.getNextDayOfWeek(this.weekday);
        //set endDate to this.date and add 8 hours
        this.endDate = new Date(this.date);
        this.endDate.setHours(this.endDate.getHours() + 8);
        this.userPreferences = new Map(); // Initialize the map
        this.availableUsers = users;
        this.type = this.getShiftType();
        this.initializePreferences();
    }
    getShiftType() {
        //get type by start hour
        //make this configurable in the future
        if (this.startHour.hours === 0) {
            return "night";
        }
        else if (this.startHour.hours === 8) {
            return "morning";
        }
        else {
            return "evening";
        }
    }
    getNextDayOfWeek(dayOfWeek) {
        let date = new Date();
        //set date to next sunday
        date.setDate(date.getDate() + (7 - date.getDay()));
        date.setDate(date.getDate() + dayOfWeek);
        //use this.startHour to set the hours
        date.setHours(this.startHour.hours);
        return date;
    }
    removeUserById(userId) {
        this.availableUsers = this.availableUsers.filter(user => user.id !== userId);
        this.userPreferences.delete(userId); // Remove user preference if user is removed
    }
    addPreference(userId, preference) {
        //add preference to current value
        this.userPreferences.set(userId, this.userPreferences.get(userId) + preference);
    }
    initializePreferences() {
        for (let user of this.availableUsers) {
            this.userPreferences.set(user.id, 40);
        }
    }
    sortUsers() {
        for (let user of this.availableUsers) {
            // Sort the availableUsers list based on the value of the users' ID preference in the userPreferences map and the users totalJustice combined
            this.availableUsers.sort((a, b) => {
                return (this.userPreferences.get(a.id) + a.justicePoints) - (this.userPreferences.get(b.id) + b.justicePoints);
            });
        }
    }
    shiftUser(user) {
        this.is_filled = true;
        this.user_taken = user;
        this.preference = this.userPreferences.get(user.id);
    }
    unShiftUser() {
        this.is_filled = false;
        this.user_taken = null;
        this.preference = 0;
    }
}
exports.shift = shift;
