//get all preferences function
//get all users function
//get all constraints function

import { Pool, QueryResult } from "pg";
import { ReacuringShift, Shift, Job, User, Constraint, Preference } from "./models";
import {
  getReacuringShiftsByJob,
  getReacuringShiftsByJobs,
  GetShiftsByDateAndJob,
  getUserJobs, getUserInfo
} from "./querries";
import { pool } from "./db";


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
  console.log("Fetching" + jobType + " jobs by date" + " " + StartDate + "-" + EndDate);
  try {
    const { rows }: QueryResult<Shift> = await client.query(
      GetShiftsByDateAndJob,
      [StartDate, EndDate, jobType],
    );
    console.log(rows);
    return rows;
  }catch(error){
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
}

export async function FetchUser(
  username: string
): Promise<User[]> {
  const client = await pool.connect();
  try {
    const { rows }: QueryResult<User> = await client.query(getUserInfo, [username]);
    return rows;
  } finally {
    client.release();
  }
}

export async function getUserShiftCount(username: string): Promise<number> {
  const client = await pool.connect();
  try {
    const queryUserJobs = `
      SELECT job_id
      FROM jobs_to_users
      INNER JOIN users ON jobs_to_users.user_id = users.id
      WHERE users.username = $1;
    `;

    const jobRes = await client.query(queryUserJobs, [username]);
    const jobIds = jobRes.rows.map(row => row.job_id);

    if (jobIds.length === 0) {
      return 0;
    }

    const queryShiftCount = `
      SELECT COUNT(*) AS shift_count
      FROM CurrentRecurringShifts
      WHERE shiftJobId = ANY($1::int[]);
    `;

    const shiftRes = await client.query(queryShiftCount, [jobIds]);
    const shiftCount = parseInt(shiftRes.rows[0].shift_count, 10);

    return shiftCount;
  } catch (err) {
    console.error('Error fetching user shift count:', err);
    return 0;
  } finally {
    await client.release();
  }
}

export async function getUserUsedPoints(username: string): Promise<number> {
  const client = await pool.connect();
  try {
    const query = `
      SELECT COALESCE(SUM(Preferences.preference), 0) AS total_points
      FROM Preferences
      INNER JOIN users ON Preferences.user_id = users.id
      WHERE users.username = $1;
    `;

    const res = await client.query(query, [username]);
    const totalPoints = parseInt(res.rows[0].total_points, 10);

    return totalPoints;
  } catch (err) {
    console.error('Error fetching user used points:', err);
    return 0;
  } finally {
    await client.release();
  }
}

export async function getAllConfirmedConstraints(startDate: Date, endDate: Date) {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * FROM Constraints
      WHERE isConfirmed = true
      AND startAt >= $1
      AND endAt <= $2;
    `;
    const { rows }: QueryResult<Constraint> = await client.query(query, [startDate, endDate]);
    return rows;
  } catch (err) {
    console.error('Error fetching confirmed constraints:', err);
    return [];
  } finally {
    await client.release();
  }
}
export async function getAllUsers(){
  const client = await pool.connect();
  try {
    const query = `
      SELECT * FROM Users
    `;
    const { rows }: QueryResult<User> = await client.query(query);
    return rows
  } catch (err) {
    console.error('Error fetching users:', err);
    return 0;
  } finally {
    await client.release();
  }
}

export async function getAllPreferences() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * FROM Preferences;
    `;
    const { rows }: QueryResult<Preference> = await client.query(query);
    return rows;
  } catch (err) {
    console.error('Error fetching preferences:', err);
    return [];
  } finally {
    await client.release();
  }
}

export async function getAllRecurringShifts() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * FROM CurrentRecurringShifts;
    `;
    const { rows }: QueryResult<ReacuringShift> = await client.query(query);
    return rows;
  } catch (err) {
    console.error('Error fetching recurring shifts:', err);
    return [];
  } finally {
    await client.release();
  }
}
