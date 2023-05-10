import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { connection } from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }

  const data = await UpdateCage();
  res.status(200).json({ code: 200, data: data });
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const now = DateTime.now().toISO();
    const [rows] = await conn.query(
      'SELECT * FROM tbl_operation   where tbl_operation.operation_type_id !=1 AND tbl_operation.status IN ("pending","today")',
      [now]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
}
