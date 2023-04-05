import { DateTime } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = await authorizationHandler(req, res, "GET");
  if (!authorization) {
    return false;
  }
  const { id }: any = req.query;

  try {
    const data: any = await SearhGetCage(id);
    if (data.length > 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res.status(404).json({ code: 200, message: "404 Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Error somethign went wrong." });
  }
}

async function SearhGetCage(id: any) {
  const conn = await connection.getConnection();
  const date = DateTime.now().setZone("Asia/Manila").toISODate();

  try {
    const sql = `select * from tbl_operation_item_details INNER JOIN tbl_inventory ON tbl_inventory.item_id = tbl_operation_item_details.item_id where tbl_operation_item_details.is_exist='true' and operation_id=? `;
    const [result] = await conn.query(sql, [id]);
    console.log(result);
    conn.release();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
