require("dotenv").config();
import { db37PacsCon } from "../src/database/radiology-37";

export default async (): Promise<void> => {
  if (process.env.CI === "true") {
    await db37PacsCon;
  }
};
