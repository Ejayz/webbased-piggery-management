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
  const { plan_name, activity_list } = req.body;
  try {
    const result: any = await Ops(plan_name, activity_list);
    console.log(result);
    if (result != 200) {
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

async function Ops(plan_name: any, activity_list: any) {
  const conn = await connection.getConnection();
  conn.beginTransaction();
  try {
    const checkDupName = "select * from tbl_plan where plan_name=?";
    const [checkDupNameResult]: any = await conn.query(checkDupName, [
      plan_name,
    ]);
    if (checkDupNameResult.length > 0) {
      return { error: 409 };
    } else {
      const createPlan = "insert into tbl_plan (plan_name) values (?)";
      const [createPlanResult]: any = await conn.query(createPlan, [plan_name]);
      const id = createPlanResult.insertId;
      await Promise.all(
        activity_list.map(async (activity: any) => {
          const createPlanActivity =
            "insert into tbl_plan_details (plan_id,`from`,`to`,item_id,type) values (?,?,?,?,?)";
          const [createPlanActivityResult]: any = await conn.query(
            createPlanActivity,
            [id, activity.from, activity.to, activity.item_id, activity.type]
          );
        })
      );
      conn.commit();
    }
    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback();
    return error;
  } finally {
    conn.release();
  }
}
