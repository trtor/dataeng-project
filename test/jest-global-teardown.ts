require("dotenv").config();
import { db37PacsPool } from "../src/database/radiology-37";

export default async (): Promise<void> => {
  try {
    console.log("Close jest con");
    await db37PacsPool.close();
  } catch (_error) {
    return;
  }
};
