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
  const data = await GetBreed();
  return res.status(200).json({ code: 200, data: data });
}

async function GetBreed() {
  const conn = await connection.getConnection();
  try {
    const sql = "select * from tbl_breed where is_exist='true'";
    const [result] = await conn.query(sql);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
