export function extractTailPart(report: string): string | null {
  const impReg = /(impression|imp)\s*:?\s*([\s\S]+)$/im;
  const match = report.match(impReg);
  if (match === null || !match[2]) return null;
  return match[2].trim();
}

export function removeSignature(str: string): string {
  const reg = /\r?\n(.+?)$/;
  const match = str.match(reg);
  if (match === null || !match[1]) return str;
  const matchedSignature: string = match[1];

  // If contain number => not signature, else remove it
  if (/\d/.test(matchedSignature)) return str;

  return str.replace(/\r?\n(.+?)$/, "").trim();
}
