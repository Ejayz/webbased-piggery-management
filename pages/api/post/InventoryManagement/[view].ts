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
  const { view } = req.query;
  console.log(req.query);

  const data: any = await View(view);
  if (data.length != 0) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res
      .status(404)
      .json({ code: 404, message: "404 Not Found.Item not found" });
  }
}

async function View(item_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql = `SELECT i.*,(SELECT closing_quantity FROM tbl_stock_card AS sc 
      WHERE sc.item_id = i.item_id
      ORDER BY sc.transaction_date DESC 
      LIMIT 1) AS latest_closing_quantity, c.category_name,s.*
  FROM tbl_inventory i 
  INNER JOIN tbl_category c ON i.category_id = c.category_id  
  INNER JOIN tbl_stock_card s ON s.item_id = i.item_id
  WHERE i.is_exist = 'true' AND i.item_id = ? AND s.transaction_date = (SELECT MAX(transaction_date) FROM tbl_stock_card WHERE item_id = i.item_id)`;
    const [err, result] = await conn.query(sql, [item_id]);
    if (err) return err;
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
