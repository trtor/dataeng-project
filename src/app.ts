import express, { Application, Request, Response } from "express";
import { readAPI } from "./api-read/api-read";
import { HNMapModel } from "./database/pg-model-hn-map";
import { RadStudyModel } from "./database/pg-model-rad-study";
import { pgSeq } from "./database/postgres-con";
import { insertReport } from "./insert-pg-database/insert";
import { authMiddleware } from "./middleware/auth-middleware";
import { extractLVEF } from "./process-extract-lvef/extract-lvef";
import { removeSig } from "./process-extract-lvef/extract-tail";
import { getRadReport } from "./rad-report/report";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/radreport/:date", authMiddleware, getRadReport);
app.post("/insertReport", authMiddleware, insertReport);
app.post("/extractLVEF", authMiddleware, extractLVEF);
app.post("/removeSignature", authMiddleware, removeSig);
app.get("/api-read/:year", readAPI);

/**
 * Health check
 */
app.get("/ping", (_req: Request, res: Response<string>) => {
  return res.status(200).end("OK");
});

// Database sync
(async function () {
  try {
    await pgSeq.authenticate();
    if (process.env.NODE_ENV !== "test") console.log("Postgres connected.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  if (!["test", "production"].includes(process.env.NODE_ENV || "")) {
    try {
      await RadStudyModel.sync({ force: true, alter: true });
      await HNMapModel.sync({ force: true, alter: true });
      console.log("Postgres model sync successful.");
    } catch (error) {
      console.error("Unable to sync model to Postgres", error);
    }
  }
})();

export default app;
