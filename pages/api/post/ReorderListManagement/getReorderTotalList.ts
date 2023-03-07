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
  try {
    const data: any = await getReorderTotal();
    if (data.length != 0) {
      return res.status(200).json({ code: 200, count: data.length });
    } else {
      return res.status(404).json({ code: 404, count: 0 });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error. Something went wrong." });
  }
}

async function getReorderTotal() {
  const conn = await connection.getConnection();
  const sql =
    "select * from tbl_reorder where is_exist='true' and status='created' or status='viewed'";
  const [result] = await conn.query(sql);
  conn.release();
  return result;
}
