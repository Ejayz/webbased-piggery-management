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
  try {
    const data: any = await Lock(reorder_id);
    if (data.affectedRows != 0) {
      return res
        .status(200)
        .json({ code: 200, message: "Reorder List was locked successfully" });
    } else {
      return res.status(404).json({
        code: 404,
        message:
          "List is not found. This would have been viewed,confirmed, or removed.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error,Something went wrong." });
  }
}

async function Lock(reorder_id: any) {
  console.log(reorder_id);
  const conn = await connection.getConnection();
  const sql =
    "update tbl_reorder set status='viewed' where is_exist='true' and reorder_id=?";
  const [result] = await conn.query(sql, [reorder_id]);
  console.log(result);
  conn.release();
  return result;
}
