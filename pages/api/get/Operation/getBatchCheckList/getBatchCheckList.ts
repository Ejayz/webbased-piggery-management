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
  const { batch_id } = req.query;
  try {
    const data: any = await UpdateCage(batch_id);
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res.status(404).json({ code: 404, message: "Create pig first." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(batch_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id INNER JOIN tbl_batch ON tbl_operation.batch_id=tbl_batch.batch_id INNER JOIN tbl_inventory ON tbl_operation_item_details.item_id=tbl_inventory.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id=tbl_operation.operation_type_id WHERE tbl_operation.is_exist='true' AND tbl_operation.status='pending' and tbl_operation.batch_id=? order by tbl_operation.operation_date asc";
    const [result] = await conn.query(sql, [batch_id]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
