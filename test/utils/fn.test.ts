import { convertDateObjToString } from "../../src/utils/fn";

describe("Convert date from object to string YYYY-MM-DD", () => {
  test("Convert valid date, should return valid format", () => {
    const date = new Date("2021-04-05T00:00:00Z");
    const res = convertDateObjToString(date);
    expect(res).toBe("2021-04-05");
  });
});
