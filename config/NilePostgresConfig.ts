import { Client } from "node-postgres";

export const nileClient = new Client({
  user: process.env.EXPO_PUBLIC_NILE_USERNAME,
  password: process.env.EXPO_PUBLIC_NILE_PASSWORD   ,
  host: "us-west-2.db.thenile.dev",
  port: 5432,
  database: "todoist_db",
});
