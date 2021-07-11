require("dotenv").config();
import request from "supertest";
import app from "../../src/app";
import { db37PacsPool } from "../../src/database/radiology-37";

describe("Report Query API", () => {
  test("Query from real DB with valid date", async () => {
    const date = "2020-01-16";
    const res = await request(app)
      .get("/radreport/" + date)
      .set({
        "X-Auth-Secret": process.env.API_SECRET,
        Accept: "application/json",
      });
    expect(res.status).toBe(200);
    expect(res.body?.payload).toBeTruthy();
    expect(res.body?.payload).toHaveLength(1760);
  });

  // afterAll(async () => {
  //   await db37PacsPool.close();
  // });
});
