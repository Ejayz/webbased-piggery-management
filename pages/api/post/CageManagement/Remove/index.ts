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
  const cage_id: number = Number(req.body.cage_id);
  try {
    const data: any = await UpdateCage(cage_id);
    console.log(data);
    if (data.affectedRows != 1) {
      return res.status(404).json({
        code: 404,
        message:
          "Data update unsuccessful. Record not found or no changes made.",
      });
    }
    return res.status(200).json({ code: 200, message: "Removed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "500 Server Error,Something went wrong." });
  }
}

async function UpdateCage(cage_id: number) {
  const conn = await connection.getConnection();
  const sql =
    "UPDATE tbl_cage SET is_exist='false'  where is_exist='true' and cage_id=?";
  const [err, result] = await conn.query(sql, [cage_id]);
  conn.release();
  if (err) return err;
  return result;
}
