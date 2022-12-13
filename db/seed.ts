import { dbClient } from "./db.ts";

export async function seedDatabase(db: dbClient) {
  // Create records
  // Admin user
  const user = new db.models.User();
  user.username = "krongs";
  user.email = "d@gmail.com";
  user.password = "hello";
  user.role = "admin";
  await user.save();

  // First method
  const firstMethodCreate = await db.models.Article.create({
    content: "Paris",
    title: "Tokyo",
    userId: 1,
  });
  console.log("firstMethodCreate: ", firstMethodCreate);

  //   Second method
  const article = new db.models.Article();
  article.content = "London";
  article.title = "San Francisco";
  article.userId = 1;
  await article.save();

  const onlyContent = await db.models.Article.select("content").all();
  console.log("onlyContent: ", onlyContent);

  const withUser = await db.models.Article.where("id", "1").user();
  console.log("withUser: ", withUser);

  const allUsers = await db.models.User.all();
  console.log("allUsers: ", allUsers);

  const withArticles = await db.models.User.where("id", "1").hasMany(
    db.models.Article
  );
  console.log("withArticles: ", withArticles);
}
