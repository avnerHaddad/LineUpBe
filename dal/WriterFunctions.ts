//update/create a prefernce(user, reacuring shift, score)
//create a reacuringshift(shift day, shift startHour, shiftEndHour, shift Jobtype)
//create a new user(username, password justicepoints)
//update a user information(userid, newusername, newpassword, newjusticepoints)
//create a constraint(start_time, end_time, user)
import { pool } from "./db";
import { Constraint } from "./models";

interface Preference {
    userid: number;
    shiftId: number;
    preference: number;
  }


export async function addPreference({ userid, shiftId, preference }: Preference): Promise<number> { {
    const client = await pool.connect();
    try {
      const query = `
      INSERT INTO Preferences (user_id, shift_id, preference)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, shift_id)
      DO UPDATE SET preference = EXCLUDED.preference;
    `;
      const values = [userid, shiftId, preference];
      await client.query(query, values);
      console.log('Preference added successfully');
    } catch (error) {
      console.error('Error adding preference:', error);
      throw error;
    } finally {
      client.release();
      return 1;
    }
  }
}

export async function addConstraint({ userid, startat, endat }: Constraint): Promise<number> { {
  const client = await pool.connect();
  try {
    const query = `
    INSERT INTO constraints (user_id, startat, endat, isconfirmed)
    VALUES ($1, $2, $3, false)
  `;
    const values = [userid, startat, endat];
    await client.query(query, values);
    console.log('Constraint added successfully');
  } catch (error) {
    console.error('Error adding Constraint:', error);
    throw error;
  } finally {
    client.release();
    return 1;
  }
}
}
