import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const data: any = await ListInventory();
  if (data.lenght != 0) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res
      .status(200)
      .json({ code: 404, message: "There is currently no low level items." });
  }
}

async function ListInventory() {
  const conn = await connection.getConnection();
  const sql = `SELECT i.*, c.category_name, FORMAT((i.item_quantity / i.item_net_weight), 2) AS item_left FROM tbl_inventory i  JOIN tbl_category c ON i.category_id = c.category_id  WHERE i.is_exist = 'true' AND (i.item_quantity / i.item_net_weight) <= 5 `;
  const [result] = await conn.query(sql, []);
  console.log(result);
  return result;
}
