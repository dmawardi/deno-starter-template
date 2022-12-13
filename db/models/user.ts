import { Model, DataTypes } from "denoDB";
import Article from "./article.ts";

export default class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  };

  static defaults = {
    name: "",
    role: "user",
  };

  static articles() {
    this.hasMany(Article);
  }
}
