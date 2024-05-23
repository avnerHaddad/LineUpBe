import { pool } from "./db";
export async function removePreferencesByUserId(userId: number){
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM Preferences WHERE user_id = $1';
    const result = await client.query(query, [userId]);
    console.log(`Removed ${result.rowCount} preference(s) for user ID ${userId}`);
  } catch (error) {
    console.error('Error removing preferences:', error);
    throw error;
  } finally {
    client.release();
  }
}