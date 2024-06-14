"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserJobs = void 0;
//gets all jobs of a scpefic user
exports.getUserJobs = `
        SELECT j.id, j.jobType
        FROM Jobs j
        INNER JOIN jobs_to_users jtu ON j.id = jtu.job_id
        inner join users u on jtu.user_id = u.id
        WHERE u.id = $1
    `;
