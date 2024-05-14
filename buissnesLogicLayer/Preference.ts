import { user } from "./user";

export class Preferance {
  user: user;
  shiftId: number;
  points: number;

  constructor(user: user, shiftId: number, points: number) {
    this.user = user;
    this.shiftId = shiftId;
    this.points = points;
  }
}
