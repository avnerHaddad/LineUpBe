import { user } from "../buissnesLogicLayer/user";
import {
  getJobsByUser,
  getCurrentRecurringShiftsByJobTypes,
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
