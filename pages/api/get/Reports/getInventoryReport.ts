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
    console.log(result)
    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
}

async function UpdateCage(from: any, to: any) {
  const conn = await connection.getConnection();
  try {
    if (to != null || to != "") {
      const [rows, fields] = await conn.query(
        "SELECT * FROM tbl_stock_card INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_stock_card.item_id INNER JOIN tbl_stock_card_details ON tbl_stock_card_details.stock_card_id=tbl_stock_card.stock_card_id WHERE transaction_date>=? AND transaction_date<=?",
        [from, to]
      );
      return rows;
    } else {
      const [rows, fields] = await conn.query(
        "SELECT * FROM tbl_stock_card INNER JOIN tbl_inventory ON tbl_inventory.item_id=tbl_stock_card.item_id INNER JOIN tbl_stock_card_details ON tbl_stock_card_details.stock_card_id=tbl_stock_card.stock_card_id WHERE transaction_date>=? ",[from]
      );
      return rows;
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
