import sql from "mssql";
import { db37PacsCon, db37PacsPool } from "../database/radiology-37";
import { convertDateObjToString } from "../utils/fn";
import { trimStringGeneric } from "../utils/fn-trim";
import { TStudyTabRes1, radReportQueryStr } from "./type-rad-report";

type QueryRadReportRes =
  | {
      code: "OK";
      payload: TStudyTabRes1[];
    }
  | { code: "NOT_FOUND" }
  | { code: "ERROR"; message: string };

export async function queryRadReport({
  date,
}: {
  date: string;
}): Promise<QueryRadReportRes> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    return { code: "ERROR", message: "Invalid date" };

  const dateBegin = new Date(date + "T00:00:00Z");
  const dateEnd = new Date(dateBegin.getTime() + 1000 * 60 * 60 * 24);
  const dateBeginStr = convertDateObjToString(dateBegin);
  const dateEndStr = convertDateObjToString(dateEnd);

  try {
    await db37PacsCon;
    const request = db37PacsPool.request();
    const query: sql.IResult<TStudyTabRes1> = await request
      .input("datebegin", sql.VarChar, dateBeginStr)
      .input("dateend", sql.VarChar, dateEndStr)
      .query(radReportQueryStr);
    if (query && query.rowsAffected[0] > 0) {
      const trim = trimStringGeneric<TStudyTabRes1>(query.recordset);
      return { code: "OK", payload: trim };
    } else {
      return { code: "NOT_FOUND" };
    }
  } catch (error) {
    return { code: "ERROR", message: error.message || error };
  }
}
