import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default connection;
