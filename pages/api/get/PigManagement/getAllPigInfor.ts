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
    const { pig_id } = req.query;
    const rows = await UpdateCage(pig_id);
    res.status(200).json({ code: 200, data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function UpdateCage(pig_id: any) {
  const conn = await connection.getConnection();
  try {
    let datas = {
      pig_history: [],
      individual: [],
      cage: [],
      batch: [],
    };
    const [rows, fields]: any = await conn.query(
      "SELECT * FROM tbl_pig INNER JOIN tbl_pig_history ON tbl_pig.pig_id=tbl_pig_history.pig_id INNER JOIN tbl_breed ON tbl_breed.breed_id=tbl_pig.breed_id INNER JOIN tbl_cage ON tbl_cage.cage_id = tbl_pig_history.cage_id INNER JOIN tbl_batch ON tbl_batch.batch_id = tbl_pig.batch_id WHERE tbl_pig.pig_id=?",
      [pig_id]
    );
    const [rows2, fields2]: any = await conn.query(
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id WHERE tbl_operation.pig_id=?",
      [pig_id]
    );
    const [rows3, fields3]: any = await conn.query(
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id INNER JOIN tbl_cage ON tbl_cage.cage_id =tbl_operation.cage_id WHERE  tbl_cage.cage_id=?",
      [rows[0].cage_id]
    );
    const [rows4, fields4]: any = await conn.query(
      "SELECT * FROM tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id = tbl_operation_item_details.operation_id INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_operation_item_details.item_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id = tbl_operation.operation_type_id INNER JOIN tbl_batch ON tbl_batch.batch_id =tbl_operation.batch_id WHERE  tbl_batch.batch_id=?",
      [rows[0].batch_id]
    );
    datas = {
      pig_history: rows,
      individual: rows2,
      cage: rows3,
      batch: rows4,
    };

    return datas;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
