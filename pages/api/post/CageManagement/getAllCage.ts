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
  const data: any = await GetCage();
  return res.status(200).json({ code: 200, data: data });
}

async function GetCage() {
  const conn = await connection.getConnection();
  const sql =
    "select * from tbl_cage where is_exist='true' and is_full='false' and cage_type='Individual Stalls'";
  const [result] = await conn.query(sql);
  conn.release();
  return result;
}
