import { Request, Response } from "express";
import { queryRadReport } from "./query-report";
import { TStudyTabRes1 } from "./type-rad-report";

type RadReportRes =
  | {
      status: 200;
      payload: TStudyTabRes1[];
    }
  | { status: 404 }
  | { status: 400 | 401 | 500; message: string };

// GET  /radreport/:hn
export async function getRadReport(
  req: Request<{ date?: string }>,
  res: Response<RadReportRes>,
): Promise<Response<RadReportRes>> {
  const { date } = req.params;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    return res.status(400).json({ status: 400, message: "Invalid date" });

  const queryReport = await queryRadReport({
    date,
  });

  if (queryReport.code === "NOT_FOUND")
    return res.status(404).json({ status: 404 });

  if (queryReport.code === "ERROR")
    return res.status(500).json({ status: 500, message: queryReport.message });

  return res.status(200).json({ status: 200, payload: queryReport.payload });
}
