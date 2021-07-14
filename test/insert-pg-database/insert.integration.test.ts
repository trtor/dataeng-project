require("dotenv").config();
import request from "supertest";
import app from "../../src/app";
import { pool } from "../__mock__/ci-pg";

const mockHN = "99999980";

describe("Report Query API", () => {
  beforeAll(async () => {
    await pool.query(`DELETE FROM hn_map WHERE siriraj_hn = '${mockHN}'`);
    await pool.query(`DELETE FROM rad_study WHERE acc_no = '26548730'`);
  });

  test("HTTP Request with invalid parameters", async () => {
    const res = await request(app)
      .post("/insertReport/")
      .send({
        si_hn: undefined,
        acc_no: undefined,
        modality: undefined,
        bodypart: undefined,
        study_date: undefined,
        insert_date: undefined,
        report_date: undefined,
        report: undefined,
        p_status: undefined,
      })
      .set({
        "X-Auth-Secret": process.env.API_SECRET,
        Accept: "application/json",
      });

    expect(res.status).toBe(400);
    expect(res.body?.status).toBe(400);
    expect(res.body?.message).toBeTruthy();
  });

  test("HTTP Request with valid parameters", async () => {
    const res = await request(app)
      .post("/insertReport/")
      .send({
        si_hn: mockHN,
        acc_no: 26548730,
        modality: "US",
        bodypart: "Abdomen",
        study_date: "2021-01-02",
        insert_date: "2020-01-02T07:45:15.543",
        report_date: undefined,
        report: "Report",
        lvef: 20,
        p_status: undefined,
      })
      .set({
        "X-Auth-Secret": process.env.API_SECRET,
        Accept: "application/json",
      });

    expect(res.status).toBe(204);
    expect(res.body?.status).toBeFalsy();
    expect(res.body?.message).toBeFalsy();
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM hn_map WHERE siriraj_hn = '${mockHN}'`);
    await pool.query(`DELETE FROM rad_study WHERE acc_no = '26548730'`);
  });
});
