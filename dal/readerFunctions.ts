//get all preferences function
//get all users function
//get all constraints function

import { Pool, QueryResult } from "pg";
import { ReacuringShift, Shift, Job } from "./models";
import {
  getReacuringShiftsByJob,
  getReacuringShiftsByJobs,
  GetShiftsByDateAndJob,
  getUserJobs,
} from "./querries";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "LineUp",
  password: "postgres",
  port: 5432, // Default PostgreSQL port
});

export async function getRecurringShiftsByJobType(
  jobType: string,
): Promise<ReacuringShift[]> {
  const client = await pool.connect();
  // Create a PostgreSQL pool
  try {
    const { rows }: QueryResult<ReacuringShift> = await client.query(
      getReacuringShiftsByJob,
      [jobType],
    );
    return rows;
  } catch (error) {
    console.error("Error fetching recurring shifts:", error);
    throw error;
  } finally {
    // Close the pool to release all resources
    client.release(); // Release the client back to the pool
  }
}

export async function getJobsByUser(username: string): Promise<Job[]> {
  const client = await pool.connect();
  try {
    // Connect to the database
    const { rows }: QueryResult<Job> = await client.query(getUserJobs, [
      username,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching jobs by user:", error);
    throw error;
  } finally {
    client.release(); //
  }
}

export async function getCurrentRecurringShiftsByJobTypes(
  jobTypes: string[],
): Promise<any[]> {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(getReacuringShiftsByJobs, [jobTypes]);
    return rows;
  } finally {
    client.release();
  }
}

export async function FetchShiftsByDate(
  StartDate: Date,
  EndDate: Date,
  jobType: string,
): Promise<Shift[]> {
  const client = await pool.connect();
  try {
    const { rows }: QueryResult<Shift> = await client.query(
      GetShiftsByDateAndJob,
      [StartDate, EndDate, jobType],
    );
    return rows;
  } finally {
    client.release();
  }
}
