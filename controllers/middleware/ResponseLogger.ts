import * as log from "log";
import { Application } from "oak";

// Add response logger to parameter app
// Adds logger first to catch the response time header on the way back
export function AddResponseLogger(app: Application) {
  // Logs the response time to console downstream after setting the response time header (below)
  app.use(async (ctx: any, next) => {
    await next();
    // When downstream, recording response time
    const time = ctx.response.headers.get("X-Response-Time");
    log.info(`(${ctx.request.method}) ${ctx.request.url}: ${time}`);
  });

  // Sets the response time header
  app.use(async (ctx: any, next) => {
    // set start time
    const startTime = Date.now();
    await next();
    // Downstream
    // Find difference between start and end time
    const delta = Date.now() - startTime;
    //   X- is convention for non standard headers
    ctx.response.headers.set("X-Response-Time", `${delta}ms`);
  });
}
