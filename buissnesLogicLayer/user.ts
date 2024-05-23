import internal from "stream";
import { job, jobEnum } from './job';
import {User} from "../dal/models";
export class user {
  username: string;
  justicePoints: number;
  jobs: jobEnum;
  scoreWithShift: { [key: number]: number } = {};

  constructor(user:User) {
    this.username = user.username;
    this.justicePoints = 0;
    this.jobs = jobEnum.Tech;
  }
}
