require("dotenv").config();
import app from "./app";

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
  server.close();
}
