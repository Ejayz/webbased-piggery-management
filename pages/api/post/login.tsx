import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import connection from "../mysql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { send } from "micro/types/src/lib";
dotenv.config();
const jwt_key: any = process.env.JWT_KEY;
//API Function that only accepts post request
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  bcrypt.genSalt(15).then((salt) => {
    bcrypt.hash("randomDdos1.com", salt).then(console.log);
  });

  if (req.method !== "POST") {
    res.status(405).json({
      code: 405,
      message: "Invalid method. This endpoint only accept POST method",
    });
    return 0;
  }
  const { username, password } = req.body;
  const query = "select * from tbl_user where IS_EXIST='true' and USERNAME=?";
  VerifyUser(username, password, query)
    .then((result: any) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      const data = result[0];
      console.log(data);
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
          res.setHeader(
            "Set-Cookie",
            `myCookie=value; expires=${expirationDate.toUTCString()}`
          );
          res.status(200).json({
            code: "200",
            message: `Welcome back ${data.username} .`,
          });
        }
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
}

async function VerifyUser(username: any, password: any, query: any) {
  return new Promise((resolve, rejects) => {
    connection.getConnection((err, conn) => {
      conn.query(query, [username], (err, result, feild) => {
        if (err) {
          rejects(err);
        }
        resolve(result);
      });
      conn.release();
    });
  });
}
