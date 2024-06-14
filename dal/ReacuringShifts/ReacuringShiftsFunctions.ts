import {ReacuringShift} from "../models";
import {QueryResult} from "pg";
const pool = require('../db');
import {getAllRecurringShiftsQuery, getReacuringShiftsByJob, getReacuringShiftsByJobs} from "./ReacuringShiftsQueries";

export async function getAllRecurringShifts(): Promise<ReacuringShift[]> {
        const {rows}: QueryResult<ReacuringShift> = await pool.query(getAllRecurringShiftsQuery);
        return rows;
    }

    export async function getCurrentRecurringShiftsByJobTypes(jobTypes: string[]): Promise<any[]> {
        const {rows} = await pool.query(getReacuringShiftsByJobs, [jobTypes]);
        return rows;
    }

    export async function getRecurringShiftsByJobType(jobType: string): Promise<ReacuringShift[]> {
        const {rows}: QueryResult<ReacuringShift> = await pool.query(getReacuringShiftsByJob, [jobType]);
        return rows;
    }
