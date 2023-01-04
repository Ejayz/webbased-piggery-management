import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import connection from "../mysql";
import { rejects } from "assert";
import { resolve } from "node:path/win32";
dotenv.config();

//API Function that only accepts post request
export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    .then((result) => {
      console.log(result);
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
