import parse from "csv-parse/lib/sync";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { InsertPostBody } from "../insert-pg-database/insert";
import { insertRadStudy } from "../insert-pg-database/query-insert";
import { extractLVEFInFindings } from "../process-extract-lvef/extract-lvef";
import { removeSignature } from "../process-extract-lvef/extract-tail";

export async function dumpInit(
  _req: Request,
  res: Response,
): Promise<Response> {
  const readfile = fs.readFileSync(path.join(__dirname, "./dump.csv"), "utf8");

  const records = parse(readfile, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const sorted: ParseCSVRes[] = records.sort((a: any, b: any) =>
    (a.StudyKey || "").localeCompare(b.StudyKey || ""),
  );

  sorted.forEach(async (a) => {
    try {
      // LVEF
      const lvef = extractLVEFInFindings(a.Report);
      const report = removeSignature(a.Report);

      let tmp: InsertPostBody = {
        si_hn: a.PID,
        acc_no: a.StudyKey,
        modality: a.Modality,
        bodypart: a.Bodypart,
        study_date: a.StudyDate,
        insert_date: a.InsertDate,
        report_date: a.ReportDT,
        report: report,
        lvef: lvef ? lvef + "" : undefined,
        p_status: a.PStatus,
      };

      const insertRes = await insertRadStudy({
        si_hn: tmp.si_hn || "",
        acc_no: Number(tmp.acc_no),
        modality: tmp.modality || null,
        bodypart: tmp.bodypart || null,
        study_date: tmp.study_date ? new Date(tmp.study_date) : null,
        insert_date: tmp.insert_date ? new Date(tmp.insert_date) : null,
        report_date: tmp.report_date ? new Date(tmp.report_date) : null,
        report: tmp.report || null,
        lvef: tmp.lvef ? Number(tmp.lvef) : null,
        p_status: tmp.p_status || null,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return res.status(200).json(sorted.length);
}

type ParseCSVRes = {
  StudyKey: string;
  std_seq: string;
  StudyInsUID: string;
  PID: string;
  PNAME: string;
  EngName: string;
  StudyID: string;
  StudyDesc: string;
  Modality: string;
  Bodypart: string;
  Room: string;
  StudyDate: string;
  StudyTime: string;
  AccessNum: string;
  PhysicianName: string;
  PatAge: string;
  SeriesCnt: string;
  ImageCnt: string;
  InsertDate: string;
  InsertTime: string;
  ArchStatus: string;
  ExamStatus: string;
  CompStatus: string;
  Comments: string;
  DelFlag: string;
  SendStatus: string;
  SockStatus: string;
  VerifyFlag: string;
  VerifyTime: string;
  AccessTime: string;
  AccessCnt: string;
  FetchReqTime: string;
  Dept: string;
  ReportDate: string;
  ReportTime: string;
  ReportLoc: string;
  Report: string;
  ReportDoctor: string;
  VerifyDoctor: string;
  PStatus: string;
  ReportDT: string;
  ReceiveFlag: string;
  ReceiveDate: string;
  ReceiveTime: string;
  ReceiveBy: string;
  Amount: string;
  Clinic: string;
  ChargeType: string;
  Charge: string;
  NM: string;
};
