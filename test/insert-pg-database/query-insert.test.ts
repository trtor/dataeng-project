import {
  findPatientIdOrInsert,
  insertRadStudy,
} from "../../src/insert-pg-database/query-insert";
import { pool } from "../__mock__/ci-pg";

const mockHN1 = "99999998";
const mockHN2 = "99999997";
const mockHN3 = "99999996";

describe("Find patient or insert new patient map model", () => {
  beforeAll(async () => {
    await pool.query(`DELETE FROM hn_map WHERE siriraj_hn = '${mockHN2}'`);
    await pool.query(
      `INSERT INTO "hn_map"("siriraj_hn", "create_at", "update_at") VALUES ('${mockHN2}', '2021-07-14 11:21:32.998+00', '2021-07-15 11:21:32.998+00');`,
    );
  });

  test("Find non-exists, should insert new", async () => {
    const res = await findPatientIdOrInsert({ si_hn: mockHN1 });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.isCreated).toBe(true);
      expect(res.result.siriraj_hn).toBe(mockHN1);
      expect(res.result.patient_id).toBeGreaterThanOrEqual(1);
    }
  });

  test("Find from exists hn, should be return exists", async () => {
    const res = await findPatientIdOrInsert({ si_hn: mockHN2 });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.isCreated).toBe(false);
      expect(res.result.siriraj_hn).toBe(mockHN2);
      expect(res.result.patient_id).toBeGreaterThanOrEqual(1);
    }
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM hn_map WHERE siriraj_hn = '${mockHN1}'`);
    await pool.query(`DELETE FROM hn_map WHERE siriraj_hn = '${mockHN2}'`);
  });
});

describe("Insert radiology study", () => {
  test("Insert sample data", async () => {
    const insertRes = await insertRadStudy({
      si_hn: mockHN3,
      acc_no: Number("25914090"),
      modality: "NM",
      bodypart: "GATED",
      study_date: null,
      insert_date: null,
      report_date: null,
      report: null,
      p_status: "COMPLETE",
    });

    expect(insertRes).not.toBeFalsy();
    if (insertRes !== false) {
      expect(insertRes.acc_no).toBe(25914090);
    }
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM hn_map WHERE siriraj_hn = '${mockHN2}'`);
    await pool.query(`DELETE FROM rad_study WHERE acc_no = '25914090'`);
  });
});
