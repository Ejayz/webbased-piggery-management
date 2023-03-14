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
  const data: any = await Ops();
  if (data.length !== 0) {
    return res.status(200).json({ code: 200, id: data[0].batch_id });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "Cannot get latest Batch number" });
  }
}

async function Ops() {
  const conn = await connection.getConnection();
  try {
    const sql = "select MAX(batch_id) as batch_id from tbl_batch";
    const [result] = await conn.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
