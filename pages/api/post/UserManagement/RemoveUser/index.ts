import { ResultSetHeader } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorize = await authorizationHandler(req, res, "POST");
  if (!authorize) {
    return false;
  }
  const { user_id } = req.body;
  const data: any = await RemoveUser({ user_id });
  if (data.affectedRows == 1 && data.changedRows == 1) {
    return res.status(200).json({ code: 200, message: "Removed successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "Server error! Something went wrong." });
  }
}

async function RemoveUser({ user_id }: any) {
  const conn = await connection.getConnection();

  const sql = "UPDATE `tbl_users` SET  `is_exist`='false' WHERE `user_id`=?;";

  const [err, result] = await conn.query(sql, [user_id]);
  conn.release();
  if (err) {
    return err;
  }
  return result;
}
