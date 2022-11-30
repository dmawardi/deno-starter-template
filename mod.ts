import { Application, send } from "oak";
import * as log from "log";
import "dotenvLoad";
// Middleware
import errorHandler from "./controllers/middleware/error.ts";
import { AddResponseLogger } from "./controllers/middleware/ResponseLogger.ts";
// Routes
import api from "./routes/api.ts";


// Routes
// import api from "./routes/api.ts";
// import staticApi from "./routes/static.ts";

const app = new Application();
const port = <string>Deno.env.get("SERVER_PORT");

console.log("port: ", port);

// Middleware
// Errors
// Set error handler to catch most errors
app.use(errorHandler);
// Response Logger
// Add the response time logger to response headers
AddResponseLogger(app);

// Routes
// Use routes from router in api.ts and prefix with /api
app.use(api.prefix("/api").routes());

  //   Handler for everything
  app.use((ctx) => {
    ctx.response.body = "Hello World!";
  });

// If this file is run as the main program
if (import.meta.main) {
  log.info("Starting Server");

  // Make event listener for port
  app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    // If hostname nullish, default to localhost
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    // Log successfully listening
    console.log(`Listening on: ${port}. Visit at:${url}`);
  });

  // Set app to listen to port
  await app.listen({ port: port });
}
