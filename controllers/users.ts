import { Router, RouterContext } from "oak";

// Create router
const router = new Router();

// Dummy data
const users = [
  {
    username: "Bokwat",
    name: "Calvin Santoso",
    email: "stinky@fool.com",
    password: "duckgoose",
  },
  {
    username: "Moose",
    name: "Juulz Naldo",
    email: "stinky@bool.com",
    password: "mooseOnFire",
  },
];

router.get("/users", (ctx: RouterContext<"/users">) => {
  ctx.response.body = users;
});

router.post("/users", async (ctx: RouterContext<"/users">) => {
  // Grab value from request body
  const user = await ctx.request.body().value;

  //   Set status code to success
  ctx.response.status = 200;
  console.log("Posting new post. body: ", user);

  //   Add record
  users.push(user);
});

export default router;
