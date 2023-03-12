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
  const checkDup: any = await checkDups({ username, user_id, job });

  if (checkDup.length >= 1) {
    return res
      .status(409)
      .json({ code: 409, message: "Username already exist." });
  }

  const data: any = await UpdateUsername({
    username,
    hashedPass,
    first_name,
    middle_name,
    last_name,
    phone,
    job,
    user_id,
  });

  if (data.affectedRows == 1) {
    return res.status(200).json({ code: 200, message: "Succesfully Updated" });
  } else {
    return res.status(500).json({
      code: 500,
      message: "500 Server error.Something went wron while updating details",
    });
  }
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
  const conn = await connection.getConnection();
  try {
    var sql = "";

    if (hashedPass != "") {
      sql =
        "UPDATE `tbl_users` SET  `username`=?, `password`=?, `first_name`=?, `middle_name`=?, `last_name`=?, `phone`=?, `job`=?  WHERE `user_id`=?;";
      const [err, result] = await conn.query(sql, [
        username,
        hashedPass,
        first_name,
        middle_name,
        last_name,
        phone,
        job,
        user_id,
      ]);
      conn.release();
      if (err) return err;
      return result;
    } else {
      sql =
        "UPDATE `tbl_users` SET  `username`=?,  `first_name`=?, `middle_name`=?, `last_name`=?, `phone`=?, `job`=? WHERE `user_id`=?;";
      const [err, result] = await conn.query(sql, [
        username,
        first_name,
        middle_name,
        last_name,
        phone,
        job,
        user_id,
      ]);
      conn.release();
      if (err) return err;
      return result;
    }
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

async function checkDups({ username, user_id, job }: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "select * from tbl_users where BINARY username=? and user_id!=? and job=? and is_exist='true'";
    const [err, result] = await conn.query(sql, [username, user_id, job]);
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
