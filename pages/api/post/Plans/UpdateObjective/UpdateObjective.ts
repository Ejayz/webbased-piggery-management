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
  const { objective_name, objective_type, plan_detail_id } = req.body;

  try {
    const data = await UpdateCage(
      objective_name,
      objective_type,
      plan_detail_id
    );
    if (data.affectedRows != 0) {
      return res
        .status(200)
        .json({ code: 200, message: "Objective updated successfully" });
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

async function UpdateCage(
  objective_name: any,
  objective_type: any,
  plan_detail_id: any
) {
  const conn = await connection.getConnection();
  try {
    const sql =
      "update tbl_plan_details_objectives set objective_name=?,type=? where is_exist='true' and plan_detail_objectives=?";
    const [sqlResult]: any = await conn.query(sql, [
      objective_name,
      objective_type,
      plan_detail_id,
    ]);
    return sqlResult;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
