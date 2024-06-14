import {Preference} from "../models";
import {QueryResult} from "pg";
const pool = require('../db');
import {addPrefQuery, deletePrefByUserIdQuery, getAllPreferencesQuery} from "./PrefQueries";

export async function getAllPreferences(): Promise<Preference[]> {
        const { rows }: QueryResult<Preference> = await pool.query(getAllPreferencesQuery);
        return rows;
}

export async function addPreference({ user_id, shift_id, preference }: Preference): Promise<QueryResult> {
        return await pool.query(addPrefQuery, [user_id, shift_id, preference]);
}

export async function removePreferencesByUserId(userId: number){
        return await pool.query(deletePrefByUserIdQuery, [userId]);
}