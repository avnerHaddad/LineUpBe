import {Constraint} from "../models";
const pool = require('../db');
import {QueryResult} from "pg";
import {addConstraintQuery, confirmConstraintQuery, getAllConstraintsQuery} from "./ConstraintQuerries";

export async function addConstraint({ userid, startat, endat }: Constraint): Promise<QueryResult> {
           return await pool.query(addConstraintQuery, [userid, startat, endat]);
}
export async function getAllConstraints(startDate: Date, endDate: Date, isConfirmed: boolean): Promise<Constraint[]> {
        const { rows }: QueryResult<Constraint> = await pool.query(getAllConstraintsQuery, [startDate, endDate, isConfirmed]);
        return rows;
}

export async function confirmConstraintDb(constraintId: number): Promise<QueryResult> {
    return await pool.query(confirmConstraintQuery, [constraintId]);
}