require("dotenv").config();
import pg from "pg";

const config: pg.PoolConfig = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  idleTimeoutMillis: 30000,
};

export const pool = new pg.Pool(config);

pool.on("connect", () => {
  if (process.env.CI === "true") console.log("Connected to test database");
});
