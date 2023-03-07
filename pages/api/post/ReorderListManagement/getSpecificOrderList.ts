import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { reorder_id } = req.body;
  const data: any = await GetReorder(reorder_id);
  if (data.length != 0) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res.status(404).json({
      code: 404,
      message: "This reorder list might have been already confirmed.",
    });
  }
}

async function GetReorder(reorder_id: any) {
  const conn = await connection.getConnection();
  const sql =
    "SELECT rd.reorder_details_id, rd.reorder_id, rd.item_id, rd.reorder_quantity, i.item_name,i.item_net_weight, r.reorder_date,  r.status FROM tbl_reorder r JOIN tbl_reorder_details rd ON r.reorder_id = rd.reorder_id JOIN tbl_inventory i ON rd.item_id = i.item_id WHERE  r.is_exist='true' and (r.status='viewed' or r.status='created') and r.reorder_id = ?;";
  const [result] = await await conn.query(sql, [reorder_id]);
  console.log(result);
  conn.release();
  return result;
}
