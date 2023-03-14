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
      "SELECT tbl_stock.*, tbl_inventory.*, (tbl_stock.total_stocks / tbl_inventory.item_net_weight) AS stock_density FROM tbl_stock INNER JOIN tbl_inventory ON tbl_stock.item_id = tbl_inventory.item_id WHERE (tbl_stock.total_stocks / tbl_inventory.item_net_weight) <= 5;";
    const [result] = await conn.query(sql, []);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
