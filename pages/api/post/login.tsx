import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import connection from "../mysql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const secret: any = process.env.HASURA_SECRET;
const jwt_key: any = process.env.JWT_KEY;
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
      console.log(result);
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
            res.setHeader("Set-Cookie", `auth=${token};path=/; max-age=86400;`);
          }
          console.log(res.getHeader("Set-Cookie"));
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
    })
    .catch((e) => {
      res.status(500).json({
        code: 500,
        message: `Internal server error:${e.code}`,
      });
    });
}

async function VerifyUser(username: string) {
  //API function to request in hasura
  console.log(secret);
  let headersList: Record<string, string> = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "x-hasura-admin-secret": secret,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username: username,
  });

  let response = await fetch("http://localhost:8080/api/rest/login", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  return JSON.parse(data);
}
