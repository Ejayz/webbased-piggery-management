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
      'SELECT s.*, i.*, (s.closing_quantity / i.item_net_weight) AS stock_density FROM tbl_stock_card s INNER JOIN tbl_inventory i ON s.item_id = i.item_id WHERE  s.is_exist="true" and (s.closing_quantity / i.item_net_weight) <= 5 AND s.transaction_date = ( SELECT MAX(transaction_date) FROM tbl_stock_card WHERE item_id = s.item_id )  GROUP BY s.item_id ORDER BY s.stock_card_id DESC LIMIT 1000 OFFSET 0';
    const [result] = await conn.query(sql, []);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
