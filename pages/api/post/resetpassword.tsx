import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import connection from "../mysql";
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as cookie from 'cookie'
dotenv.config()
const jwt_key: any = process.env.JWT_KEY


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, username, password }: any = req.body;
  const cookies: any = req.cookies.reset_auth
  const data = cookie.parse(cookies)

  if (cookies == undefined) {
    return res.status(401).json({ code: 500, "message": "Session is invalid.Please reload and try again" })

  }
  if (jwt.verify(cookies, jwt_key)) {
    generateHased(password).then((hashedPass) => {
      resetPassword(phone, username, hashedPass).then((OKPackets: any) => {
        console.log(OKPackets.affectedRows)
        const affectedRow = OKPackets.affectedRows;
        if (affectedRow == 1) {
          return res.status(200).json({
            code: 200,
            message: "Password was reset successfully .Login now!",
          });
        } else {
          return res
            .status(500)
            .json({ code: 500, message: "Server error.Something went wrong." });
        }
      });
    });
  }
}

async function resetPassword(
  phone: string,
  username: string,
  password: string
) {
  return new Promise((resolve, rejects) => {
    const query = "UPDATE `piggery_management`.`tbl_users` SET `password`=? WHERE  `username`=? and phone=? and is_exist='true';";
    connection.getConnection((err, conn) => {
      conn.beginTransaction((err) => {
        console.log(err)
      })
      conn.query(query, [password, username, phone], (err, result, feilds) => {
        if (err) {
          conn.rollback(console.log)
          rejects(err)
        }
        conn.commit((err) => {
          if (err) {
            conn.rollback(console.log)
            rejects(err)
          }

        })

        resolve(result)
        console.log(result)

      })
    })
  })
}

async function generateHased(password: string) {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
