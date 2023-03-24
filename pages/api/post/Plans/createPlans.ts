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
  const { plan_name } = req.body;
  try {
    const result: any = await Ops(plan_name);
    console.log(result);
    if (result.affectedRow == 0) {
      return res
        .status(500)
        .json({ code: 500, message: "Failed to create plan." });
    } else if (result.error == 409) {
      return res.status(409).json({
        code: 409,
        message: "Plan name already exist.",
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: "Plan created successfully.",
        data: result.insertId,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "Failed to create plan." });
  }
}

async function Ops(plan_name: any) {
  const conn = await connection.getConnection();
  try {
    const checkDupName = "select * from tbl_plan where plan_name=?";
    const [checkDupNameResult]: any = await conn.query(checkDupName, [
      plan_name,
    ]);
    if (checkDupNameResult.length > 0) {
      return { error: 409 };
    } else {
      const createPlan = "insert into tbl_plan (plan_name) values (?)";
      const [createPlanResult] = await conn.query(createPlan, [plan_name]);
      return createPlanResult;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
