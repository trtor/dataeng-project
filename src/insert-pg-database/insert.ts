import { Request, Response } from "express";
import { insertRadStudy } from "./query-insert";

type InsertReportRes = { status: 400 | 401 | 500; message: string };

// POST  /insertReport
export async function insertReport(
  req: Request<{}, {}, InsertPostBody>,
  res: Response<InsertReportRes>,
): Promise<Response<InsertReportRes> | void> {
  const {
    si_hn,
    acc_no,
    modality,
    bodypart,
    study_date,
    insert_date,
    report_date,
    report,
    lvef,
    p_status,
  } = req.body;

  if (!acc_no || !si_hn)
    return res
      .status(400)
      .json({ status: 400, message: "Invalid request parameters" });

  const insertRes = await insertRadStudy({
    si_hn,
    acc_no: Number(acc_no),
    modality: modality || null,
    bodypart: bodypart || null,
    study_date: study_date ? new Date(study_date) : null,
    insert_date: insert_date ? new Date(insert_date) : null,
    report_date: report_date ? new Date(report_date) : null,
    report: report || null,
    lvef: lvef ? Number(lvef) : null,
    p_status: p_status || null,
  });

  if (insertRes === false)
    return res
      .status(500)
      .json({ status: 500, message: "Failed to insert to database" });

  return res.status(204).end();
  // TODO Check date format and timezone
}

type InsertPostBody = {
  si_hn?: string;
  acc_no?: string;
  modality?: string;
  bodypart?: string;
  study_date?: string;
  insert_date?: string;
  report_date?: string;
  report?: string;
  lvef?: string;
  p_status?: string;
};
