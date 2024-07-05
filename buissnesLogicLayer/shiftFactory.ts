import {Constraint, Preference, ReacuringShift} from "../dal/models";
import {user} from "./user";
import {shift} from "./shift";
import {getAllUsers, getUsersWithJob} from "../dal/User/userFunctions";

export async function shiftFactory(shifts: ReacuringShift[], users: user[], constraints: Constraint[], Preferences: Preference[]): Promise<shift[]> {
    //create a map between shiftJobTypes and UserswithThatJob
    const shiftsToJobs : Map<number, number[]> = new Map();
    const Newshifts : shift[] = [];
    //go over all shifts
    for (const reacuringShift of shifts) {
        let nextShift = new shift(reacuringShift, users)
        if(!shiftsToJobs.has(nextShift.jobId)){
            shiftsToJobs.set(nextShift.jobId, (await getUsersWithJob(nextShift.jobId)).map(user => user.id))
            //filter users that dont hace id set in shifttojobs
            nextShift.availableUsers.filter(user=> {
                // @ts-ignore
                return shiftsToJobs.get(nextShift.jobId).includes(user.id);
            })
        }else{
            nextShift.availableUsers.filter(user=> {
                // @ts-ignore
                return shiftsToJobs.get(nextShift.jobId).includes(user.id);
            })
        }
        Newshifts.push(nextShift)
    }
    //go over all shifts, if a shifts date is in the range of the constraint start and end time remove the user assigned to the constraint from the shift possible users list
    for (let shift of Newshifts) {
        for (let constraint of constraints) {
            if (isDateInRange(shift.date, constraint.startat, constraint.endat)) {
                shift.removeUserById(constraint.userid);
            }
        }
    }

    for (let preference of Preferences) {
        for (let shift of Newshifts) {
            if (preference.shift_id === shift.shiftId) {
                shift.addPreference(preference.user_id, preference.preference);
            }
        }
    }
    return Newshifts;
}

function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
}

export async function  userFactory(){
    const users = await getAllUsers()
    //return a list of new user(User)
    return users.map(dbUser => new user(dbUser))

}