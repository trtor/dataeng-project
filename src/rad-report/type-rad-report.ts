export type TStudyTabRes1 = {
  StudyKey: number;
  HN: string;
  PNAME: string | null;
  EngName: string | null;
  StudyDesc: string | null;
  Modality: string | null;
  Bodypart: string | null;
  Room: string | null;
  StudyDate: string | null; // ISO8601 Format
  PatAge: string | null;
  InsertDate: string | null; // ISO8601 Format
  ExamStatus: number | null;
  Comments: string | null;
  VerifyTime: string | null; // ISO8601 Format
  Dept: string | null;
  ReportDate: string | null;
  ReportTime: string | null;
  Report: string | null;
  ReportDoctor: string | null;
  VerifyDoctor: string | null;
  PStatus: string | null;
  ReportDT: string | null; // ISO8601 Format
  Amount: number | null;
  Clinic: string | null;
  ChargeType: string | null;
  Charge: number | null;
};

export const radReportQueryStr = `SELECT 
  StudyKey,
  PID as HN,
  PNAME,
  EngName,
  StudyDesc,
  Modality,
  Bodypart,
  Room,
  CONVERT(char(23), StudyDate,126) as StudyDate,
  PatAge,
  CONVERT(char(23), InsertDate,126) as InsertDate,
  ExamStatus,
  Comments,
  CONVERT(char(23), VerifyTime,126) as VerifyTime,
  Dept,
  ReportDate,
  ReportTime,
  Report,
  ReportDoctor,
  VerifyDoctor,
  PStatus,
  CONVERT(char(23), ReportDT,126) as ReportDT,
  Amount,
  Clinic,
  ChargeType,
  Charge
FROM ${process.env.DB_RAD_37_DATABASE_TSTUDYTAB_SCHEMA}.TStudyTab
WHERE InsertDate BETWEEN @datebegin AND @dateend;`;

if (process.env.DB_RAD_37_DATABASE_TSTUDYTAB_SCHEMA === undefined)
  console.error("ENV Schema is undefined");
