import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import connection from "../mysql";
import { resolve } from "path";
import { rejects } from "assert";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, username, password, token }: any = req.body;
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
