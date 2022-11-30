import { Router, RouterContext } from "oak";
import users from "../controllers/users.ts";

const router = new Router();

// Dummy data
const posts = [
  {
    username: "Abdul",
    message: "You smell like cheese",
  },
  {
    username: "Doumei",
    message: "You smell like Goat",
  },
];

router.get("/", (ctx: RouterContext<"/">) => {
  console.log("hitting /api");
  ctx.response.body = "Hitting API.";
});

// User Routes
router.use(users.routes(), users.allowedMethods());

// router.get("/users", (ctx: RouterContext<"/users">) => {
//   ctx.response.body = { message: "Returns list of users" };
// });

router.get("/posts", (ctx: RouterContext<"/posts">) => {
  console.log("Hitting GET posts");
  ctx.response.body = posts;
});

router.post("/posts", async (ctx: RouterContext<"/posts">) => {
  // Grab value from request body
  const post = await ctx.request.body().value;
  //   Set status to success
  ctx.response.status = 200;
  console.log("Posting new post. body: ", post);

  //   Add record
  posts.push(post);
});

// router
//   .get("/beers", getBeers)
//   .get("/beers/:id", getBeerDetails)
//   .post("/beers", createBeer)
//   .put("/beers/:id", updateBeer)
//   .delete("/beers/:id", deleteBeer);

export default router;
