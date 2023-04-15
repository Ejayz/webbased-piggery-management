import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  try {
    const { from, to } = req.query;
    const result = await UpdateCage(from, to);
    console.log(result);
    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
}

async function UpdateCage(from: any, to: any) {
  const conn = await connection.getConnection();
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id   WHERE operation_type_id='2' AND operation_date>=? AND operation_date<=? AND STATUS!='pending'",
      [from, to]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
