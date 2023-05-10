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
      "SELECT *,(SELECT closing_quantity FROM tbl_stock_card AS sc  WHERE sc.item_id = tbl_inventory.item_id ORDER BY sc.transaction_date DESC   LIMIT 1) AS latest_closing_quantity  FROM tbl_operation INNER JOIN tbl_operation_type on tbl_operation_type.operation_type_id= tbl_operation.operation_type_id INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id = tbl_operation_item_details.item_id  WHERE tbl_operation.operation_id = ? AND tbl_operation.is_exist='true'";
    const [rows]: any = await conn.query(getOperation, [operation_id]);
    console.log(rows);
    const getOperationDetails =
      "select * from tbl_operation_item_details where operation_id=?";
    const [rows2] = await conn.query(getOperationDetails, [operation_id]);
    const getBatchDetails = "select * from tbl_batch where batch_id=?";
    const [rows3] = await conn.query(getBatchDetails, [rows[0].batch_id]);
    const getPigDetails = "select * from tbl_pig where pig_id=?";
    const [rows4] = await conn.query(getPigDetails, [rows[0].pig_id]);
    const getCageDetails = "select * from tbl_cage where cage_id=?";
    const [rows5] = await conn.query(getCageDetails, [rows[0].cage_id]);
    return {
      operation: rows,
      operation_details: rows2,
      batch_details: rows3,
      pig_details: rows4,
      cage_details: rows5,
    };
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
