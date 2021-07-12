require("dotenv").config();
import { db37PacsPool } from "../src/database/radiology-37";
import { pgSeq } from "../src/database/postgres-con";

export default async (): Promise<void> => {
  try {
    console.log("Close jest con");
    await db37PacsPool.close();
    await pgSeq.close();
  } catch (_error) {
    return;
  }
};
