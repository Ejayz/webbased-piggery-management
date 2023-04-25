import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }

  try {
    const result = await UpdateCage();
    res.status(200).json({ code: 200, data: result });
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const sql =
      "select * from tbl_inventory INNER JOIN tbl_stock_card ON tbl_inventory.item_id=tbl_stock_card.item_id where tbl_inventory.is_exist='true'";
    const [result] = await conn.query(sql, []);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
