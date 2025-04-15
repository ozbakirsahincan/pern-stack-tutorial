import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const {PGHOST , PGUSER, PGPASSWORD, PGDATABASE,} = process.env;
const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

// Create sql connection from env
export const sql = neon(connectionString);