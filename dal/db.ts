import {Pool} from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "LineUp",
    password: "admin",
    port: 5432, // Default PostgreSQL port
  });


module.exports = {
    query: (text:string, params:any) => pool.query(text, params),
    end: () => pool.end(),
};