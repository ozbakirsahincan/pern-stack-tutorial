// import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();


const {PGHOST , PGUSER, PGPASSWORD, PGDATABASE,} = process.env;
const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;


export const sql = postgres(connectionString, {
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
})