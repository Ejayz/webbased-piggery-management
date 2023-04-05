import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  try {
    const data: any = await UpdateCage();
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res
        .status(404)
        .json({ code: 404, message: "Create schedules first" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const sql = `SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id WHERE tbl_operation.is_exist='true' AND tbl_operation.status='pending' and tbl_operation.cage_id!='Null' GROUP BY tbl_operation.cage_id`;
    const [result] = await conn.query(sql, []);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
