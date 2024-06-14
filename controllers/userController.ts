import { removePreferencesByUserId } from "../dal/Prefs/PreferenceFunctions";
import { addConstraint} from "../dal/Constraints/ConstraintFunctions";
import { addPreference } from "../dal/Prefs/PreferenceFunctions";
import { getJobsByUser } from "../dal/Jobs/JobFunctions";
import { getUserShiftCount, getUserUsedPoints } from "../dal/User/userFunctions";
import { Request, Response } from "express";
import {ShiftToPoints} from "../config/config"; // Response from 'express';


export const getUserJobs = async (
  req: Request,
  res: Response,
): Promise<Response> => {
    if (!req.query.id) return res.status(400).json({ message: "User ID is required" });
    try{
        const user_id = parseInt(req.query.id as string);
        const user_jobs = await getJobsByUser(user_id);
        return res.json(user_jobs.map((job) => job.jobtype));
    }catch (error){
        console.log("error while getting user jobs: " + error);
        return res.json({ message: "Error while getting user jobs!" });
    }
};

export const calculateFreePoints = async (req: Request, res: Response): Promise<Response> => {
  if (!req.query.username) return res.status(400).json({ message: "Username is required" });
  const username = req.query.username as string;
  try{
    const totalPoints = await getUserShiftCount(username) * ShiftToPoints;
    const usedPoints = await getUserUsedPoints(username);
    return res.json({PontsLeft: totalPoints-usedPoints});
  }catch (error){
    console.log("error while calculating free points: " + error);
    return res.json({ message: "Error while calculating free points!" });
  }

}

export const setPrefs = async (req: Request, res: Response): Promise<Response> => {
  const  {preference, shift_id, user_id} = req.body;
  try{
    await addPreference({user_id, shift_id, preference});
    return res.json({ message: "Updated Pref!" });
  }catch (error){
    console.log("error while setting prefs: " + error);
    return res.json({ message: "Error while setting prefs!" });
    }
}


export const resetPrefs = async (req: Request, res: Response) => {
  try{
    const userid = parseInt(req.body.userid);
    await removePreferencesByUserId(userid);
    return res.json({message: "Succefully rested prefs"});
  }catch(error){
    console.log("error while reseting prefs: " + error);
    return res.json({ message: "Error while reseting prefs!" });
  }
}

export const setConstraint = async (req: Request, res: Response): Promise<Response> => {
  try{
    const  {startat, endat, userid} = req.body;
    addConstraint({userid, startat, endat});
    console.log(userid + ": " + startat + ": " + endat);
    return res.json({ message: "Created Constraint!" });
  }catch (error){
    console.log("error while setting constraint: " + error);
    return res.json({ message: "Error while setting constraint!" });
  }
}
