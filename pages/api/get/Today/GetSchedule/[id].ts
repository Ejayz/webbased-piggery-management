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
    const sql = `select *,(select count(*) from tbl_operation_item_details where tbl_operation_item_details.operation_id=tbl_operation.operation_id) as \`total_item\`,tbl_pig.* from tbl_operation INNER JOIN tbl_operation_item_details ON tbl_operation.operation_id=tbl_operation_item_details.operation_id  INNER JOIN tbl_pig ON tbl_operation.pig_id=tbl_pig.pig_id INNER JOIN tbl_operation_type ON tbl_operation_type.operation_type_id=tbl_operation.operation_type_id where  tbl_operation.is_exist='true' and tbl_operation.status='pending' AND tbl_operation.operation_id=? AND operation_date=? `;
    const [result] = await conn.query(sql, [id, date]);
    conn.release();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
