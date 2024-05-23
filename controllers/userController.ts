import { user } from "../buissnesLogicLayer/user";
import { removePreferencesByUserId } from "../dal/DeleterFunctions";
import { addConstraint, addPreference} from "../dal/WriterFunctions";
import {
  getJobsByUser,
  getCurrentRecurringShiftsByJobTypes,
  getUserShiftCount,
  getUserUsedPoints,
} from "../dal/readerFunctions";
import { Request, Response } from "express"; // Response from 'express';
export const getPossibleShifts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  //gets all shifts the user can work on
  var userjobs = await getJobsByUser("user1");
  const jobTypes: string[] = userjobs.map((job) => job.jobtype);
  const shifts = await getCurrentRecurringShiftsByJobTypes(jobTypes);
  return res.json(shifts);
};

export const getUserJobs = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  var userjobs = await getJobsByUser("user1");
  return res.json(userjobs);
};


export const setPrefs = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);
  const  {preference, shiftId, userid} = req.body;
  addPreference({userid, shiftId, preference});
  console.log(userid + ": " + shiftId + ": " + preference);
  return res.json({ message: "Updated Pref!" });
  //update the user info in the client
}

export const calculateFreePoints = async (req: Request, res: Response): Promise<Response> => {
  const username = req.query.username as string;
  var totalPoints = await getUserShiftCount(username) * 5;
  var usedPoints = await getUserUsedPoints(username);
  console.log(username + ": " + totalPoints);
  return res.json({PontsLeft: totalPoints-usedPoints});
}

export const resetPrefs = async (req: Request, res: Response) => {
  const userid = parseInt(req.body.userid);
  try{
    removePreferencesByUserId(userid);
    return res.json({message: "Succefully rested prefs"});
  }catch(error){
    console.log("error while reseting prefs: " + error);
  }
}

export const setConstraint = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);
  const  {startat, endat, userid} = req.body;
  addConstraint({userid, startat, endat});
  console.log(userid + ": " + startat + ": " + endat);
  return res.json({ message: "Created Constraint!" });
  //update the user info in the client
}
