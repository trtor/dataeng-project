import { selectRadStudy } from "../../src/api-read/query-read";
import { pool } from "../__mock__/ci-pg";
import fs from "fs";
import path from "path";

describe("Read data for API exposed", () => {
  beforeAll(async () => {
    await pool.query(
      `DELETE FROM rad_study WHERE acc_no IN ('${mockAccList.join("', '")}')`,
    );
    const insertMock = fs.readFileSync(
      path.join(__dirname, "../__mock__/rad-report/4-report-api.sql"),
      "utf8",
    );
    await pool.query(insertMock);
  });

  test("Read from mock data, 2020", async () => {
    const res = await selectRadStudy({ year: "2020" });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload).toHaveLength(17);
    }
  });

  test("Read from mock data, 2019", async () => {
    const res = await selectRadStudy({ year: "2019" });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload).toHaveLength(6);
    }
  });

  test("Read from mock data, 2023", async () => {
    const res = await selectRadStudy({ year: "2023" });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload).toHaveLength(0);
    }
  });

  afterAll(async () => {
    await pool.query(
      `DELETE FROM rad_study WHERE acc_no IN ('${mockAccList.join("', '")}')`,
    );
  });
});

const mockAccList: string[] = [
  "25885234",
  "25885309",
  "25885409",
  "25885414",
  "25888030",
  "25888928",
  "25891809",
  "25891846",
  "25893241",
  "25893247",
  "25893252",
  "25896600",
  "25896709",
  "25897565",
  "25898455",
  "25898557",
  "25899316",
  "25900058",
  "25900378",
  "25901347",
  "25902161",
  "25902285",
  "25903144",
];
