import {ReacuringShift, User} from "../dal/models";
import {forEach, map} from "lodash";
import {user} from "./user";
import {shift} from "./shift";
import {getRawAsset} from "node:sea";
import {getUsersWithJob} from "../dal/User/userFunctions";

export async function shiftFactory(shifts: ReacuringShift[], users: user[]): Promise<shift[]> {
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
    return Newshifts;
}