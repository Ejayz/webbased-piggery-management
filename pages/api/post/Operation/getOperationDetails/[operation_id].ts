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
  const { operation_id } = req.query;
  const result = await Ops(operation_id);
  res.status(200).json({ code: 200, data: result });
}

async function Ops(operation_id: any) {
  const conn = await connection.getConnection();
  try {
    const getOperation =
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id=tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id=tbl_operation.operation_type_id INNER JOIN ( SELECT item_id, MAX(transaction_date) AS max_date FROM tbl_stock_card GROUP BY item_id) AS latest ON tbl_inventory.item_id = latest.item_id INNER JOIN tbl_stock_card ON tbl_stock_card.item_id = latest.item_id AND tbl_stock_card.transaction_date = latest.max_date WHERE tbl_operation.operation_id = ? AND tbl_operation.is_exist='true'";
    const [rows] = await conn.query(getOperation, [operation_id]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
