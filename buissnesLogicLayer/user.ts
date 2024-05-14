import internal from "stream";
import { job, jobEnum } from "./job";
export class user {
  username: string;
  justicePoints: number;
  minShifts: number;
  jobs: jobEnum;
  scoreWithShift: { [key: number]: number } = {};

  constructor(
    username: string,
    justicePoints: number,
    minShifts: number,
    jobs: jobEnum,
  ) {
    this.username = username;
    this.justicePoints = justicePoints;
    this.minShifts = minShifts;
    this.jobs = jobs;
  }
}
