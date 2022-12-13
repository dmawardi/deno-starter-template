import { Model, DataTypes } from "denoDB";
import User from "./user.ts";

export default class Article extends Model {
  static table = "articles";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    ArticleDuration: DataTypes.FLOAT,
  };

  static defaults = {
    ArticleDuration: 2.5,
  };

  static user() {
    return this.hasOne(User);
  }
}
