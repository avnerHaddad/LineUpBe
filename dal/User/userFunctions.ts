import {QueryResult} from "pg";
import {User} from "../models";
import {
    getAllUsersQuery,
    getUserInfo,
    getUserJobsQuery,
    getUsersByJobQuery,
    getUserShiftCountQuery,
    getUserUsedPointsQuery
} from "./UserQueries";

const pool = require('../db');


export async function FetchUser(username: string): Promise<User[]> {
        const { rows }: QueryResult<User> = await pool.query(getUserInfo, [username]);
        return rows;
}

export async function getUserShiftCount(username: string): Promise<number> {
        const jobRes = await pool.query(getUserJobsQuery, [username]);
        // @ts-ignore
    const jobIds = jobRes.rows.map(row => row.job_id);
        if (jobIds.length === 0) {
            return 0;
        }
        const shiftRes = await pool.query(getUserShiftCountQuery, [jobIds]);
        return parseInt(shiftRes.rows[0].shift_count, 10);
}

export async function getUserUsedPoints(username: string): Promise<number> {
        const res = await pool.query(getUserUsedPointsQuery, [username]);
    return parseInt(res.rows[0].total_points, 10);
}


export async function getAllUsers(): Promise<User[]> {
        const { rows }: QueryResult<User> = await pool.query(getAllUsersQuery);
        return rows;
}

export async function getUsersWithJob(jobId: number): Promise<User[]> {
    const {rows}: QueryResult<User> = await pool.query(getUsersByJobQuery, [jobId])
    return rows;
}




