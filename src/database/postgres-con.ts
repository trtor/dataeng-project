import { Sequelize } from "sequelize";

export const pgSeq = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "",
  password: process.env.POSTGRES_PASS || "",
  database: process.env.POSTGRES_DB || "",
  logging: false,
  timezone: "+07:00",
});

export async function closeConnection(): Promise<void> {
  await pgSeq.close();
  if (process.env.NODE_ENV !== "test")
    console.log("Close postgres connection success");
}

// Check ENV
if (
  !process.env.POSTGRES_HOST ||
  !process.env.POSTGRES_PORT ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASS ||
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_SCHEMA
)
  console.error("Missing ENV variables");
