import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response<{ status: 401; message: string }>,
  next: NextFunction,
): Promise<Response | void> {
  if (
    (process.env.CI === "true" || process.env.NODE_ENV === "test") &&
    process.env.NODE_ENV !== "production"
  ) {
    next();
    return;
  }

  const secret = req.headers["x-auth-secret"];
  if (secret !== process.env.API_SECRET) {
    // console.log(req.headers);
    return res.status(401).json({ status: 401, message: "Invalid API key" });
  }

  next();
  return;
}
