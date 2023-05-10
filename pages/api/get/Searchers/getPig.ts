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
  const { cage_id, batch_id } = req.query;
  try {
    const data = await UpdateCage(cage_id, batch_id);
    res.status(200).json({ code: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}

async function UpdateCage(cage_id: any, batch_id: any) {
  const conn = await connection.getConnection();
  try {
    const [rows] = await conn.query(
      "select * from tbl_pig_history INNER JOIN tbl_batch ON tbl_pig_history.batch_id=tbl_batch.batch_id INNER JOIN tbl_cage ON tbl_cage.cage_id = tbl_pig_history.cage_id where tbl_pig_history.cage_id=? and tbl_pig_history.batch_id=? and pig_history_status='active' and tbl_pig_history.is_exist='true'",
      [cage_id, batch_id]
    );

    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.release();
  }
}
