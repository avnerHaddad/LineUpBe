import { jobEnum } from "./job";
import { user } from "./user";
import { shiftBoard } from "./shiftBoard";

export class shift {
  is_filled: boolean;
  user_taken: user;
  //a way to connect it with the user score he gave it
  job: jobEnum;
  shiftId: number;
  avgScore: number;
  availableUsers: user[];

  constructor(
    is_filled: boolean,
    user_taken: user,
    job: jobEnum,
    shiftId: number,
  ) {
    this.is_filled = is_filled;
    this.user_taken = user_taken;
    this.job = job;
    this.shiftId = shiftId;
    this.avgScore = 0;
    this.availableUsers = [];
  }
}
