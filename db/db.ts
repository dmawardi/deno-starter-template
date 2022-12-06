import { DataTypes, Database, Model, PostgresConnector } from "denoDB";

interface dbClient {
  client: Database;
  models: {
    Flight: typeof Flight;
    User: typeof User;
  };
}

// Connection
const connection = new PostgresConnector({
  host: <string>Deno.env.get("DB_HOST"),
  username: <string>Deno.env.get("DB_USERNAME"),
  password: <string>Deno.env.get("DB_PASSWORD"),
  database: "Deno_App",
});

const db = new Database(connection);

// Models
class Flight extends Model {
  static table = "flights";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    flightDuration: DataTypes.FLOAT,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
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
}

//   Connect to DB using created models
db.link([Flight, User]);

//   Create tables: Sync DB and drop if not found
await db.sync({ drop: true });

// await db.close();

export default <dbClient>{
  client: db,
  models: {
    Flight: Flight,
    User: User,
  },
};

//   Connect
//   await client.connect();

//   const array_result = await client.queryArray("SELECT ID, NAME FROM PEOPLE");
// console.log(array_result.rows); // [[1, 'Carlos'], [2, 'John'], ...]

// const object_result = await client.queryObject("SELECT ID, NAME FROM PEOPLE");
// console.log(object_result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'John'}, ...]

// await client.end();
