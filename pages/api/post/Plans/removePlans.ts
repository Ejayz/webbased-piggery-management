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
  const { plan_id } = req.body;
  try {
    const result = await UpdateCage(plan_id);
    res.status(200).json({ code: 200, message: "Plan removed successfully" });
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
}

async function UpdateCage(plan_id: any) {
  const conn = await connection.getConnection();
  try {
    const removePlans = "Update tbl_plan set is_exist='false' where plan_id=?";
    const [resultremovePlans] = await conn.query(removePlans, [plan_id]);
    return resultremovePlans;
  } catch (error) {
    return error;
  } finally {
    conn.release();
  }
}
