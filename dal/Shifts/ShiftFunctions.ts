import {Shift} from "../models";
import {QueryResult} from "pg";
const pool = require('../db');
import {GetShiftsByDateAndJob, getShiftsByDates, writeShiftsQuery} from "./ShiftsQueries";
import {shift} from "../../buissnesLogicLayer/shift";

export async function FetchShiftsByDate(StartDate: Date, EndDate: Date, jobType: string): Promise<Shift[]> {
        const { rows }: QueryResult<Shift> = await pool.query(GetShiftsByDateAndJob, [StartDate, EndDate, jobType]);
        return rows;
}

export async function fetchShiftsByDateOnly(startDate: Date, endDate: Date): Promise<Shift[]> {
        const { rows }: QueryResult<Shift> = await pool.query(getShiftsByDates, [startDate, endDate]);
        return rows;
}

export async function writeShifts(startDate: Date, endDate: Date, shifts: shift[]): Promise<void> {
        await pool.query('BEGIN');
        for (const shift of shifts) {
            await pool.query(
                writeShiftsQuery,
                [shift.user_taken?.id, shift.date, shift.endDate],
            );
        }
        await pool.query('COMMIT');
}