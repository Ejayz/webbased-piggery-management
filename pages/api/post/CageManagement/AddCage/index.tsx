import { ResultSetHeader } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import connection from "pages/api/mysql";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = await authorizationHandler(req, res, "POST");
  if (!authorization) {
    return false;
  }
  const { cage_name, cage_capacity, cage_type } = req.body;

  const users = await getUsers(authorization.cookie);
  const user_id = users.user_id;

  const dups: any = await checkDups(cage_name);
  if (dups.length != 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Cage name already exist" });
  }

  const data: any = await AddCage(cage_name, cage_capacity, cage_type, user_id);
  if (data.affectedRows != 0) {
    return res
      .status(200)
      .json({ code: 200, message: "Cage added successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong" });
  }
}
async function AddCage(
  cage_name: string,
  cage_capacity: Number,
  cage_type: String,
  user_id:any
) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "INSERT INTO `tbl_cage` ( `cage_name`, `cage_type`, `cage_capacity`,user_id) VALUES ( ?, ?, ?,?);";

    const [err, result] = await conn.query(sql, [
      cage_name,
      cage_type,
      cage_capacity,
      user_id,
    ]);
    conn.release();
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
async function checkDups(cage_name: string) {
  const conn = await connection.getConnection();
  try {
    const sql = "select * from tbl_cage where cage_name=? and is_exist='true' ";
    const [err, result] = await conn.query(sql, [cage_name]);
    conn.release();
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
