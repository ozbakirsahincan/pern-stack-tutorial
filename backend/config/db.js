// import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();


const {PGHOST , PGUSER, PGPASSWORD, PGDATABASE,} = process.env;



export const sql = postgres( {
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
})