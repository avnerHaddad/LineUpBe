import internal from "stream";
import { job, jobEnum } from './job';
import {User} from "../dal/models";
export class user {
  username: string;
  justicePoints: number;
  jobs: jobEnum;
  id: number
  scoreWithShift: { [key: number]: number } = {};
  maxShiftsPerWeek: number;

  constructor(user:User) {
    this.id = user.id;
    this.username = user.username;
    this.justicePoints = 0;
    this.jobs = jobEnum.Tech;
    this.maxShiftsPerWeek = 3; // Default value for max shifts per week - make cocnfigurable in the future

  }
}
