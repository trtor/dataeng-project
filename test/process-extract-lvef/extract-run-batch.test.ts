require("dotenv").config();
import {
  extractLVEFImp,
  extractLVEFInFindings,
} from "../../src/process-extract-lvef/extract-lvef";
import { mockPair1 } from "../__mock__/gbp-1000-report-value-pair";

describe("Batch run extract from FINDINGS", () => {
  test("Batch run 100 samples, should return valid data", () => {
    const results: boolean[] = mockPair1.map((e) => {
      const res = extractLVEFInFindings(e[0]);
      // if (res === null) console.log(e[0]);
      expect(res).toBe(e[1]);
      return res === e[1];
    });
    expect(results.every((e) => e)).toBeTruthy();
    // console.log(results);
  });
});

describe("Batch run extract from IMPRESSION", () => {
  test("Batch run 100 samples, should return valid data", () => {
    const results: boolean[] = mockPair1.map((e) => {
      const res = extractLVEFImp(e[0]);
      if (res === null || res !== e[1]) console.log(e[0]);
      expect(res).toBe(e[1]);
      return res === e[1];
    });
    expect(results.every((e) => e)).toBeTruthy();
    // console.log(results);
  });
});
