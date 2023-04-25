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
    const data: any = await Ops();
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res
        .status(200)
        .json({ code: 404, message: "There is currently no low level items." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal Server Error" });
  }
}

async function Ops() {
  const conn = await connection.getConnection();
  try {
    const sql =
      "SELECT tbl_category.*,tbl_inventory.*, tbl_stock_card.*,FORMAT((tbl_stock_card.closing_quantity / tbl_inventory.item_net_weight), 2) AS item_left FROM tbl_inventory   INNER JOIN tbl_category ON tbl_inventory.category_id=tbl_category.category_id   INNER JOIN (        SELECT item_id, MAX(transaction_date) AS max_date        FROM tbl_stock_card        GROUP BY item_id      ) AS latest ON tbl_inventory.item_id = latest.item_id INNER JOIN tbl_stock_card ON tbl_stock_card.item_id = latest.item_id AND tbl_stock_card.transaction_date = latest.max_date  WHERE tbl_inventory.is_exist = 'true' AND  FORMAT((tbl_stock_card.closing_quantity / tbl_inventory.item_net_weight), 2)<=5";
    const [result] = await conn.query(sql, []);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
