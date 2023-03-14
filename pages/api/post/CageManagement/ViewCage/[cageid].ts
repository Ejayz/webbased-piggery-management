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
  const cageid: Number = Number(req.query.cageid);
  try {
    const data: any = await ViewCage(cageid);
    if (data.length == 0) {
      return res.status(404).json({ code: 404, message: "Details not found." });
    }
    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    console.log("Catch:" + error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong" });
  }
}

async function ViewCage(cage_id: any) {
  const conn = await connection.getConnection();
  const sql =
    "select * from tbl_cage where cage_id=? AND is_exist='true' AND is_full='false'";
  const [err, result] = await conn.query(sql, [cage_id]);
  conn.release();
  if (err) return err;
  return result;
}
