require("dotenv").config();
import { queryRadReport } from "../../src/rad-report/query-report";

describe("Query Radiology report by date", () => {
  test("Query real data from valid date", async () => {
    const datestr = "2020-01-16";
    const res = await queryRadReport({ date: datestr });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload).toHaveLength(1760);
    }
  });

  test("Query with invalid date, should return ERROR", async () => {
    const datestr = "2020-01-146";
    const res = await queryRadReport({ date: datestr });
    expect(res.code).toBe("ERROR");
  });
});
