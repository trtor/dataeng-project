require("dotenv").config();
import app from "./app";
import { closeConnection } from "./database/postgres-con";
import { db37PacsPool } from "./database/radiology-37";

const port = (process.env.NODE_PORT || 5040) as number;

/*  */

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Stop Node.js process, Graceful shutdown
 */
process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
function closeServer(): void {
  server.close(async () => {
    await db37PacsPool.close();
    await closeConnection();
    if (process.env.NODE_ENV !== "test" && process.env.CI !== "true")
      console.log("Closed out remaining connections");
  });
}
