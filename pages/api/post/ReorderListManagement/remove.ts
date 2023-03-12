import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { reorder_id } = req.body;
  const data: any = await RemoveReorder(reorder_id);
  if (data.affectedRows !== 0) {
    return res.status(200).json({ code: 200, message: "Removed Successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error,Something went wrong." });
  }
}

async function RemoveReorder(reorder_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "update tbl_reorder set is_exist='false' where reorder_id=? and is_exist='true'";
    const [result] = await conn.query(sql, [reorder_id]);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
