"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "LineUp",
    password: "admin",
    port: 5432, // Default PostgreSQL port
});
module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
};
