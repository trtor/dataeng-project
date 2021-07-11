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

// Find calculated .. \d\d% in findings
// find 1st match in impression
// if (match => return )
