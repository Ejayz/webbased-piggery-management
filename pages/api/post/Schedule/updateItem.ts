import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { item_id, operation_id } = req.body;

  try {
    const data: any = await UpdateCage(item_id, operation_id);

    res
      .status(200)
      .json({ code: 200, message: "Scheduled operation item updated." });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong." });
  }
}

async function UpdateCage(item_id: any, operation_id: any) {
  const conn = await connection.getConnection();
  try {
    const update = await conn.query(
      "update tbl_operation_item_details set item_id =? where operation_id=?",
      [item_id, operation_id]
    );
    return update;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.release();
  }
}
