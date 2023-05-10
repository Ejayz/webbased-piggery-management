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
    const { from, to, type } = req.query;
    const result = await UpdateCage(from, to, type);
    console.log(result);
    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
}

async function UpdateCage(from: any, to: any, type: any) {
  const conn = await connection.getConnection();
  try {
    let rows: any = [];
    if (type == "cage") {
      [rows] = await conn.query(
        "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id  INNER JOIN tbl_cage ON tbl_cage.cage_id=tbl_operation.cage_id  INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id   WHERE operation_type_id='3'  AND date(operation_date)>=? AND date(operation_date)<=? AND STATUS!='pending' AND status!='today'",
        [from, to]
      );
    } else if (type == "batch") {
      [rows] = await conn.query(
        "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id INNER JOIN tbl_batch ON tbl_operation.batch_id=tbl_batch.batch_id  INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id   WHERE operation_type_id='3'  AND date(operation_date)>=? AND date(operation_date)<=? AND STATUS!='pending' AND status!='today'",
        [from, to]
      );
    } else if (type == "individual") {
      [rows] = await conn.query(
        "SELECT * ,DATEDIFF(DATE(tbl_operation.operation_date),tbl_pig.birthdate) AS days_old FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation_item_details.operation_id=tbl_operation.operation_id INNER JOIN tbl_pig ON tbl_pig.pig_id=tbl_operation.pig_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id   WHERE operation_type_id='3'  AND date(operation_date)>=? AND date(operation_date)<=? AND STATUS!='pending' AND status!='today'",
        [from, to]
      );
    }

    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
