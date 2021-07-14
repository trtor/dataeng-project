require("dotenv").config();
import { db37PacsCon } from "../src/database/radiology-37";
import { pgSeq } from "../src/database/postgres-con";
import { RadStudyModel } from "../src/database/pg-model-rad-study";
import { HNMapModel } from "../src/database/pg-model-hn-map";

export default async (): Promise<void> => {
  if (process.env.CI === "true") {
    await pgSeq.authenticate();
    await Promise.all([
      RadStudyModel.sync({ force: true, alter: true }),
      HNMapModel.sync({ force: true, alter: true }),
    ]);
    await db37PacsCon;
  }
};
