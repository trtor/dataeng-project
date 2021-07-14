import CONFIG from "../config";

/**
 * Validate Siriraj HN
 * @param hn - HN string
 * @returns Boolean, valid ?
 */
export function validateHN(hn: string): boolean {
  const hn_reg = new RegExp(`^\\d{${CONFIG.HNLength}}$`);
  return hn_reg.test(hn);
}

/**
 * Convert date object to string YYYY-MM-DD
 * @param d date object
 * @returns date in YYYY-MM-DD format
 */
export function convertDateObjToString(d: Date) {
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}
