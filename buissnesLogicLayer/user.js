"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const job_1 = require("./job");
class user {
    constructor(user) {
        this.scoreWithShift = {};
        this.id = user.id;
        this.username = user.username;
        this.justicePoints = 0;
        this.jobs = job_1.jobEnum.Tech;
    }
}
exports.user = user;
//# sourceMappingURL=user.js.map