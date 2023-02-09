import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";
import bcrypt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const {
    username,
    password,
    first_name,
    middle_name,
    last_name,
    phone,
    job,
    user_id,
  } = req.body;
  var hashedPass = "";
  if (password != "") {
    hashedPass = await generateHased(password);
  }

  const result = await UpdateUsername({
    username,
    hashedPass,
    first_name,
    middle_name,
    last_name,
    phone,
    job,
    user_id,
  });

  return res.send(req.body);
}

async function UpdateUsername({
  username,
  hashedPass,
  first_name,
  middle_name,
  last_name,
  phone,
  job,
  user_id,
}: any) {
  return new Promise((resolve, reject) => {
    var sql = "";
    connection.getConnection((err, conn) => {
      if (hashedPass != "") {
        sql =
          "UPDATE `tbl_users` SET  `username`=?, `password`=?, `first_name`=?, `middle_name`=?, `last_name`=?, `phone`=?, `job`=?  WHERE `user_id`=?;";
        conn.query(
          sql,
          [
            username,
            hashedPass,
            first_name,
            middle_name,
            last_name,
            phone,
            job,
            user_id,
          ],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            conn.release();
          }
        );
      } else {
        sql =
          "UPDATE `tbl_users` SET  `username`=?,  `first_name`=?, `middle_name`=?, `last_name`=?, `phone`=?, `job`=? WHERE `user_id`=?;";
        conn.query(
          sql,
          [username, first_name, middle_name, last_name, phone, job, user_id],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            conn.release();
          }
        );
      }
    });
  });
}
async function generateHased(password: string) {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
