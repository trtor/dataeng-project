import { Request, Response } from "express";

type ExtractLVEFRes =
  | {
      status: 200;
      payload: number | null;
    }
  | { status: 400 | 401; message: string };

// POST  /extractLVEF
export async function extractLVEF(
  req: Request<{}, {}, { report?: string }>,
  res: Response<ExtractLVEFRes>,
): Promise<Response> {
  const { report } = req.body;
  if (!report)
    return res.status(400).json({ status: 400, message: "No report data" });
  const efImp = extractLVEFImp(report);
  const efFindings = extractLVEFInFindings(report);

  if (efImp !== efFindings) {
    console.log("LVEF mismatched", report);
  }

  return res.status(200).json({ status: 200, payload: efFindings });
}

export function extractLVEFImp(report: string): number | null {
  const reg = /impress([\s\S]*?)(\d{2})\s{0,2}%/im;
  const match = report.match(reg);
  if (match === null || !match[2]) return null;
  return parseInt(match[2]);
}

export function extractLVEFInFindings(report: string): number | null {
  const reg =
    /findi([\S\s]*?)calculat([^:]*?)(\d{2})\s{0,2}%([\S\s]*?)impress/im;
  const match = report.match(reg);
  if (match === null || !match[3]) return null;
  return parseInt(match[3]);
}
