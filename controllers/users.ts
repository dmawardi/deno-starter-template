import { Router, RouterContext } from "oak";
import db from "../db/db.ts";

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

router.get("/users", async (ctx: RouterContext<"/users">) => {
  console.log("hitting users");
  const allUsers = await db.models.User.all();
  console.log("allUsers: ", allUsers);
  ctx.response.body = allUsers;
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
