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
    const result = await Ops();
    return res.status(200).json({ code: 200, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  }
}

async function Ops() {
  const conn = await connection.getConnection();
  const getFarrowing =
    "select * from tbl_plan INNER JOIN tbl_plan_details ON tbl_plan.plan_id=tbl_plan_details.plan_id INNER JOIN tbl_inventory ON tbl_inventory.item_id = tbl_plan_details.item_id where plan_name='Grower' and tbl_plan.is_exist='true' and tbl_plan_details.is_exist='true' ORDER BY tbl_plan_details.day ASC";
  try {
    const [result] = await conn.query(getFarrowing);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
