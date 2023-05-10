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
  try {
    const data = await UpdateCage();
    res.status(200).json({ code: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const [rows] = await conn.query(
      "select * from tbl_batch where is_exist='true'"
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.release();
  }
}
