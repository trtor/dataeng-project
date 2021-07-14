import { Request, Response } from "express";

type RemoveSignatureRes =
  | {
      status: 200;
      payload: string;
    }
  | { status: 400 | 401; message: string };

// POST  /removeSignature
export async function removeSig(
  req: Request<{}, {}, { report?: string }>,
  res: Response<RemoveSignatureRes>,
): Promise<Response> {
  const { report } = req.body;
  if (!report)
    return res.status(400).json({ status: 400, message: "No report data" });

  const removed = removeSignature(report);

  return res.status(200).json({ status: 200, payload: removed });
}

// TODO Remove unused function
export function extractTailPart(report: string): string | null {
  const impReg = /(impression|imp)\s*:?\s*([\s\S]+)$/im;
  const match = report.match(impReg);
  if (match === null || !match[2]) return null;
  return match[2].trim();
}

export function removeSignature(str: string): string {
  if (str) str = str.trim();
  const reg = /\r?\n(.+?)$/;
  const match = str.match(reg);
  if (match === null || !match[1]) return str;
  const matchedSignature: string = match[1];

  // If contain number => not signature, else remove it
  if (/\d{2}/.test(matchedSignature)) return str;

  return str.replace(/\r?\n(.+?)$/, "").trim();
}
