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
  const { view } = req.query;
  try {
    const data = await UpdateCage(view);
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res
        .status(404)
        .json({ code: 404, message: "No Data found realated to :" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(plan_detail_objectives: any) {
  const conn = await connection.getConnection();
  try {
    const sql =
      'select * from tbl_plan_details_objectives where plan_detail_objectives=? and is_exist="true"';
    const [sqlResult]: any = await conn.query(sql, [plan_detail_objectives]);
    return sqlResult;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
