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
    const result = await UpdateCage();
    console.log(result);
    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const [rows, fields] = await conn.query(
      "SELECT *, (SELECT closing_quantity FROM tbl_stock_card AS sc  WHERE sc.item_id = tbl_inventory.item_id ORDER BY sc.transaction_date DESC   LIMIT 1) AS latest_closing_quantity,COUNT( tbl_stock_card.item_id) AS item_count,  tbl_inventory.* FROM tbl_stock_card  INNER JOIN tbl_inventory ON tbl_stock_card.item_id = tbl_inventory.item_id INNER JOIN tbl_category ON tbl_category.category_id=tbl_inventory.category_id WHERE tbl_stock_card.is_exist = 'true' GROUP BY tbl_inventory.item_id"
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
