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
  const { plan_id } = req.query;
  try {
    const result = await UpdateCage(plan_id);
    res.status(200).json({ code: 200, data: result });
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

async function UpdateCage(plan_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "select * from tbl_plan INNER JOIN tbl_plan_details ON tbl_plan.plan_id=tbl_plan_details.plan_id INNER JOIN tbl_inventory ON tbl_plan_details.item_id=tbl_inventory.item_id where tbl_plan.is_exist='true' and tbl_plan.plan_id=? ";
    const [resultSql] = await conn.query(sql, [plan_id]);
    return resultSql;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
