require("dotenv").config();
import fs from "fs";
import sql from "mssql";
import path from "path";

const createDB = fs.readFileSync(
  path.join(__dirname, "./rad-report/1-create-db.sql"),
  "utf8",
);

const createTable1 = fs.readFileSync(
  path.join(__dirname, "./rad-report/2-create-table-TStudy.sql"),
  "utf8",
);

const insertPacplusmaster = fs.readFileSync(
  path.join(__dirname, "./rad-report/3-insert-report-1.sql"),
  "utf8",
);

const pool1 = new sql.ConnectionPool({
  server: process.env.DB_RAD_37_IP || "localhost",
  user: process.env.DB_RAD_37_USERNAME,
  port: Number(process.env.DB_RAD_37_PORT) || undefined,
  password: process.env.DB_RAD_37_PASSWORD,
  options: { enableArithAbort: true, encrypt: false },
});

const pool1_conn = pool1.connect();

(async function runCIDatabase() {
  try {
    await pool1_conn;
    const request = pool1.request();
    await request.query(createDB);
    await request.query(createTable1);
    await request.query(insertPacplusmaster);
    console.log("Insert mock data success.");
    await pool1.close();
    process.exit(0);
  } catch (err) {
    console.error("SQL error mssql", err);
  }
})();
