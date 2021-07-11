require("dotenv").config();
import {
  extractLVEFImp,
  extractLVEFInFindings,
} from "../../src/process-extract-lvef/extract-lvef";

describe("Extract LVEF from Report Impression", () => {
  test("Empty report, shoud return null", () => {
    const str: string = "";
    const result = extractLVEFImp(str);
    expect(result).toBeNull();
  });

  test("Sample report, should return valid data", () => {
    const str = sampleReport1;
    const result = extractLVEFImp(str);
    expect(result).toBe(67);
  });
});

describe("Extract LVEF from report FINDINGS", () => {
  test("Empty report, shoud return null", () => {
    const str: string = "";
    const result = extractLVEFImp(str);
    expect(result).toBeNull();
  });

  test("Sample report, should return valid data", () => {
    const str = sampleReport1;
    const result = extractLVEFInFindings(str);
    expect(result).toBe(67);
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

Kijja, M.D.`;
