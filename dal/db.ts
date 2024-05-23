import { Pool, QueryResult } from "pg";
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "LineUp",
    password: "postgres",
    port: 5432, // Default PostgreSQL port
  });