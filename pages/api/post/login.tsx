import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import connection from "../mysql";
import { rejects } from "assert";
dotenv.config();

const jwt_key: any = process.env.JWT_KEY


//API Function that only accepts post request
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({
      code: 405,
      message: "Invalid method. This endpoint only accept POST method",
    });
    return 0;
  }
  const { username, password, rememberme } = req.body;
  VerifyUser(username)
    .then((result: any) => {
      console.log(result)
      console.log(result.length);
      if (result.length !== 0) {
        const data = result[0];
        bcrypt.compare(password, data.password, (err, result) => {
          if (result) {
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
            if (rememberme) {
              res.setHeader(
                "Set-Cookie",
                `auth=${token}; path=/; max-age=2592000;"`
              );
            } else {
              res.setHeader(
                "Set-Cookie",
                `auth=${token};path=/; max-age=86400;`
              );
            }
            res.status(200).json({
              code: "200",
              message: `Welcome back ${data.username} .`,
            });
          } else {
            res.status(401).json({
              code: 401,
              message:
                "Username/Password do not match from our system. Please try again!",
            });
          }
        });
      } else {
        res.status(401).json({
          code: 401,
          message:
            "Username/Password do not match from our system. Please try again!",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        code: 500,
        message: `Internal server error:${e.code}`,
      });
    });
}

async function VerifyUser(username: string) {
  return new Promise((resolve, rejects) => {
    connection.getConnection((err, conn) => {
      conn.query("select * from tbl_users where username=? and is_exist='true'", [username], (err, result, fields) => {
        if (err) rejects(err);
        resolve(result);
      })
    })
  })
}
