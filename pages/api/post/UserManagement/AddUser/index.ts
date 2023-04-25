import { rejects } from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import {connection} from "../../../mysql";
import bcrypt, { genSalt } from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { getCookie } from "cookies-next";
import { verifyJWT } from "../../../jwtProcessor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = getCookie("auth", { req, res });

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ code: 405, message: "This API Endpoint expects POST method." });
  }
  if (cookie == null || cookie == undefined) {
    return res
      .status(401)
      .json({ code: 401, message: "Invalid access .Please login first" });
  }
  const verified = await verifyJWT(cookie);
  if (!verified) {
    return res.status(401).json({
      code: 401,
      message: "Invalid access token. Please relogin.",
    });
  }
  const { username, first_name, middle_name, last_name, password, phone, job } =
    req.body;
  const hashedPassword = await generateHased(password);
  const checkDup: any = await checkDups({ username, job });

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
    return res.status(200).json({ code: 200, message: `Account created.` });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "Server error ! Something went wrong." });
  }
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
  hashedPassword,
  phone,
  job,
}: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "INSERT INTO `piggery_management`.`tbl_users` (`username`, `password`, `first_name`, `middle_name`, `last_name`, `phone`, `job`) VALUES (?, ?, ?, ?, ?, ?, ?);";

    const [result] = await conn.query(sql, [
      username,
      hashedPassword,
      first_name,
      middle_name,
      last_name,
      phone,
      job,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}

async function checkDups({ username, job }: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "select * from tbl_users where BINARY username=? and is_exist='true' and job=?";

    const [err, result] = await conn.query(sql, [username, job]);
    conn.release();
    if (err) {
      return err;
    }

    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
