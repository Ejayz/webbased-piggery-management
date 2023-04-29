import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import {connection} from "../mysql";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as cookie from "cookie";
import authorizationHandler from "../authorizationHandler";

dotenv.config();
const jwt_key: any = process.env.JWT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST", {
    cookieName: "reset_auth",
  });
  if (!authorized) {
    return false;
  }
  console.log(req.body);
  const { phone, username, password, job }: any = req.body;
  try {
    const hashedPass = await generateHased(password);
    const data: any = await resetPassword(phone, username, hashedPass);
    if (data.affectedRows <= 0) {
      return res.status(404).json({
        code: 404,
        message:
          "Data update unsuccessful. Record not found or no changes made.",
      });
    }
    return res
      .status(200)
      .json({ code: 200, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function resetPassword(
  phone: string,
  username: string,
  password: string,
 
) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "UPDATE `tbl_users` SET  `password`=? WHERE username=?  and  phone=? and is_exist='true';";
    const [err, result] = await conn.query(sql, [
      password,
      username,
    
      phone,
    ]);
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}

async function generateHased(password: string) {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
