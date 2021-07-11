require("dotenv").config();
import { db37PacsPool } from "../src/database/radiology-37";

export default async (): Promise<void> => {
  try {
    await db37PacsPool.close();
  } catch (_error) {
    return;
  }
};
