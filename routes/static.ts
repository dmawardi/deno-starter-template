import { send } from "oak";

// API Endpoint
// denoted by no use of next variables
export default async (ctx: any) => {
  // context is an object that contains req, resp, & app state
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index.html",
    // "/javascripts/script.js",
    // "/stylesheets/style.css",
    // "/images/favicon.ico",
    // "/videos/space.mp4",
  ];
  //   If the file path is included in the whitelist
  if (fileWhitelist.includes(filePath)) {
    try {
      // then send file in filepath
      await send(ctx, filePath, {
        // Deno cwd is current working directory
        // root is the directory to serve
        root: `${Deno.cwd()}/public`,
      });

      //   If error
    } catch (err) {
      console.log("static error found:", err);
      ctx.response.status = 404;
      //   ctx.response.body = { msg: error.message };
      ctx.response.body = "Page/Resource not found";
      // throw error;
    }
  }
};
