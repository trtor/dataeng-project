import express, { Application, Request, Response } from "express";
import { authMiddleware } from "./middleware/auth-middleware";
import { getRadReport } from "./rad-report/report";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/radreport/:date", authMiddleware, getRadReport);

/**
 * Health check
 */
app.get("/ping", (_req: Request, res: Response<string>) => {
  return res.status(200).end("OK");
});

export default app;
