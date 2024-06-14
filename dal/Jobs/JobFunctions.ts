import {Job} from "../models";
import {QueryResult} from "pg";
const pool = require('../db');
import {getUserJobs} from "./JobQueries";

export async function getJobsByUser(userid: number): Promise<Job[]> {
        const { rows }: QueryResult<Job> = await pool.query(getUserJobs, [userid]);
        return rows;
}