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
  const { item_id } = req.body;

  const data: any = await View(item_id);
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
    const sql = `SELECT i.*, c.category_name
  FROM tbl_inventory i 
  JOIN tbl_category c ON i.category_id = c.category_id 
  WHERE i.is_exist = 'true' AND i.item_id = ? `;
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
