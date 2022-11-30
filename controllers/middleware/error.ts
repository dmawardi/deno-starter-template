// Error middleware function
export default async function (ctx: any, next) {
    // try to go to next middleware,
    try {
      await next();
      // but if any issues
    } catch (error) {
      // log.error(error);
      console.log("error detected: ", error.message);
      // Moved above to error handler (event listener above)
      ctx.response.status = 500;
      //   ctx.response.body = { msg: error.message };
      ctx.response.body = "Internal server error";
      //   throw error;
    }
  }
  