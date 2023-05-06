import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../mysql";
import { rejects } from "assert";
dotenv.config();

const jwt_key: any = process.env.JWT_KEY;

//API Function that only accepts post request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );

  if (req.method !== "POST") {
    return res.status(405).json({
      code: "405",
      message: "Invalid method. This endpoint only accept POST method",
    });
    return 0;
  }
  const { username, password, rememberme } = req.body;
  VerifyUser(username)
    .then((result: any) => {
      if (result.length !== 0) {
        const data = result[0];
        console.log(result);
        bcrypt.compare(password, data.password, (err, result) => {
          const userInfo = {
            user_id: data.user_id,
            user_name: data.username,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            job: data.job,
          };
          const token = jwt.sign(userInfo, jwt_key);
          console.log(result);
          if (result) {
            if (rememberme) {
              return res
                .status(200)
                .setHeader(
                  "Set-Cookie",
                  `auth=${token}; path=/; max-age=2592000;"`
                )
                .json({
                  code: "200",
                  message: `Welcome back ${data.username} .`,
                });
            } else {
              return res
                .status(200)
                .setHeader("Set-Cookie", `auth=${token};path=/; max-age=86400;`)
                .json({
                  code: "200",
                  message: `Welcome back ${data.username} .`,
                });
            }
          } else {
            return res.status(401).json({
              code: "401",
              message:
                "Username/Password do not match from our system. Please try again!",
            });
          }
        });
      } else {
        return res.status(401).json({
          code: "401",
          message:
            "Username/Password do not match from our system. Please try again!",
        });
      }
    })
    .catch((e) => {
      return res.status(500).json({
        code: "500",
        message: `Internal server error:${e.code}`,
      });
    });
}

async function VerifyUser(username: string) {
  const conn = await connection.getConnection();
  try {
    const [err, result] = await conn.query(
      "select * from tbl_users where BINARY username=? and is_exist='true'",
      [username]
    );
    conn.release();
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
}
