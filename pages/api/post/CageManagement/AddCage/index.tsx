import { ResultSetHeader } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authrization = await authorizationHandler(req, res, "POST");
  if (!authrization) {
    return false;
  }
  const { cage_name, cage_capacity, cage_type } = req.body;
  const dups: any = await checkDups(cage_name);
  if (dups.length != 0) {
    return res
      .status(409)
      .json({ code: 409, message: "Cage name already exist" });
  }

  const data: any = await AddCage(cage_name, cage_capacity, cage_type);
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
  cage_type: String
) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "INSERT INTO `tbl_cage` ( `cage_name`, `cage_type`, `cage_capacity`) VALUES ( ?, ?, ?);";

    const [err, result] = await conn.query(sql, [
      cage_name,
      cage_type,
      cage_capacity,
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
