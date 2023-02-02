import { rejects } from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import connection from "../mysql";
import bcrypt, { genSalt } from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = getCookie("auth");
  console.log(cookie);

  if (req.method !== "POST") {
    res
      .status(405)
      .json({ code: 405, message: "This API Endpoint expects POST method." });
  }

  const { username, first_name, middle_name, last_name, password, phone, job } =
    req.body;
  const hashedPassword = await generateHased(password);
  const checkDup: any = await checkDups({ username });
  if (checkDup.length >= 1) {
    return res
      .status(409)
      .json({ code: 409, message: "Username already exist." });
  }

  const create: any = await createUser({
    username,
    first_name,
    middle_name,
    last_name,
    hashedPassword,
    phone,
    job,
  });
  if (create.affectedRows == 1) {
    res
      .status(200)
      .json({ code: 200, message: `User account created for ${username}` });
  } else {
    res
      .status(500)
      .json({ code: 500, message: "Server error ! Something went wrong" });
  }
  console.log(create);
}

async function generateHased(password: string) {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function createUser({
  username,
  first_name,
  middle_name,
  last_name,
  password,
  phone,
  job,
}: any) {
  return new Promise((resolve, rejects) => {
    const sql =
      "INSERT INTO `piggery_management`.`tbl_users` (`username`, `password`, `first_name`, `middle_name`, `last_name`, `phone`, `job`) VALUES (?, ?, ?, ?, ?, ?, ?);";
    connection.getConnection((err, conn) => {
      if (err) rejects(err);
      conn.query(
        sql,
        [username, password, first_name, middle_name, last_name, phone, job],
        (error, result, feilds) => {
          if (error?.errno == 1062)
            rejects({ code: 1062, message: "Username already used" });
          resolve(result);
          conn.release();
        }
      );
    });
  });
}

async function checkDups({ username }: any) {
  return new Promise((resolve, reject) => {
    const sql = "select * from tbl_users where username=? and is_exist='true'";
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      conn.query(sql, [username], (error, result, fields) => {
        if (error) reject(error);
        resolve(result);
        conn.release();
      });
    });
  });
}
