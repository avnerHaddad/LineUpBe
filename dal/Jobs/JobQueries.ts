//gets all jobs of a scpefic user
export const getUserJobs = `
        SELECT j.id, j.jobType
        FROM Jobs j
        INNER JOIN jobs_to_users jtu ON j.id = jtu.job_id
        inner join users u on jtu.user_id = u.id
        WHERE u.id = $1
    `;