import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  const data: any = await GetCage();
  return res.status(200).json({ code: 200, data: data });
}

async function GetCage() {
  const conn = await connection.getConnection();
  try {
    const sql =
      "select * from tbl_cage where is_exist='true' and is_full='false' and cage_type='Quarantine Cage'";
    const [result] = await conn.query(sql);

    console.log(result)
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
