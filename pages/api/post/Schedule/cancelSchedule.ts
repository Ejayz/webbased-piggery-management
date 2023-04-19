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
    const { operation_id } = req.body;
    const data: any = await UpdateCage(operation_id);
    res
      .status(200)
      .json({ code: 200, message: "Scheduled operation canceled." });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong." });
  }
}
async function UpdateCage(operation_id: any) {
  const conn = await connection.getConnection();
  try {
    const [rows] = await conn.query(
      'update tbl_operation set status="canceled" where operation_id=?',
      [operation_id]
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.release();
  }
}
