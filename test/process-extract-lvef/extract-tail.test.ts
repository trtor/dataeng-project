require("dotenv").config();
import {
  extractTailPart,
  removeSignature,
} from "../../src/process-extract-lvef/extract-tail";

describe("Extract LVEF from Report", () => {
  test("Empty report, shoud return null", () => {
    const text = "";
    const result = extractTailPart(text);
    expect(result).toBeNull();
  });

  test("One sample report, should return text after impression", () => {
    const text = sampleReport1;

    const result = extractTailPart(text);
    expect(result).not.toBeNull();
    if (result !== null) {
      const testReg = /1\. Normal left ventricular function/i.test(result);
      expect(testReg).toBe(true);
    }
  });
});

describe("Remove signature", () => {
  test("Empty report, shoud return null", () => {
    const text = "";
    const result = removeSignature(text);
    expect(result).toBeFalsy();
  });

  test("One sample report, should remove signature", () => {
    const text = sampleReport1;
    const result = removeSignature(text);
    if (result) {
      const testReg = /on 26\/06\/2020/i.test(result);
      expect(testReg).toBe(true);
    }
  });
});

// Two function test
describe("Extract Imp. and remove signature", () => {
  test("One sample report", () => {
    const text = sampleReport1;
    const step1 = extractTailPart(text);
    expect(step1).not.toBeNull();
    if (step1) {
      const step2 = removeSignature(step1);

      const reg1test = /1\. Normal left ventricular function/i.test(step2);
      expect(reg1test).toBe(true);
      if (reg1test) {
        const reg2test = /on 26\/06\/2020/i.test(step2);
        expect(reg2test).toBe(true);
      }
    }
  });
});

const sampleReport1 = `GATED BLOOD POOL IMAGING (Tc-99m labeled RBC) 5th Study 
  
HISTORY: A 47-year-old female with history of breast cancer is sent to evaluate follow-up cardiac function.

TECHNIQUE: Invivo labelling of Tc-99m RBC was performed using intravenous injection of .... mCi Tc-99m pertechnetate 20 minutes following intravenous administration of stannous-containing compound.The imaging of the heart was acquired in LAO45, LAO70 and anterior views in supine position 10 minutes afterwards with ECG gating acquisition.

COMPARISON STUDY: 1st gated blood pool imaging on 26/06/2020 and previous study on 31/03/2021

FINDINGS: The study reveals normal contraction of left ventricle without wall motion abnormality. 
                   The phase images show synchronous contraction of ventricles. 
                    Amplitude and paradox images appear unremarkable.
                   Calculated left ventricular ejection fraction at rest is 67%, which is no significant change of LVEF as compared to the previous study on 31/03/2021 (LVEF of 63%) but 12% decrease of LVEF as compared to the baseline study on 26/06/2020 (LVEF of 79%).

IMPRESSION:
1. Normal left ventricular function with resting LVEF of 67% with no significant change as compared to previous study
2. 12% decrease of LVEF as compared to the baseline study on 26/06/2020

Kijja, M.D.

`;
