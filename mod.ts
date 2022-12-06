import { Application, send } from "oak";
import * as log from "log";
import "dotenvLoad";
// Middleware
import errorHandler from "./controllers/middleware/error.ts";
import { AddResponseLogger } from "./controllers/middleware/ResponseLogger.ts";
// Routes
import api from "./routes/api.ts";
import staticApi from "./routes/static.ts";
import db from "./db/db.ts";
import { DB } from "https://deno.land/x/sqlite@v3.1.3/mod.ts";

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

// Static routes
// If no match to routes found above,
// then serve from static folder
app.use(staticApi);

// Create records
// First method
const firstMethodCreate = await db.models.Flight.create({
  departure: "Paris",
  destination: "Tokyo",
});
console.log("firstMethodCreate: ", firstMethodCreate);

//   Second method
const flight = new db.models.Flight();
flight.departure = "London";
flight.destination = "San Francisco";
await flight.save();

// Admin user
const user = new db.models.User();
user.username = "krongs";
user.email = "d@gmail.com";
user.password = "hello";
user.role = "admin";
await user.save();

const onlyDestinations = await db.models.Flight.select("destination").all();
console.log("onlyDestinations: ", onlyDestinations);

const allUsers = await db.models.User.all();
console.log("allUsers: ", allUsers);

// If this file is run as the main program
// then setup server and listen to port
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
