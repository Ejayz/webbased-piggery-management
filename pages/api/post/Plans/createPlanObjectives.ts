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
  const { plan_id, day, objectiveDetails } = req.body;
  try {
    const result = await Ops(plan_id, day, objectiveDetails);
    console.log(objectiveDetails);
    if (result == 200) {
      return res.status(200).json({ code: 200, message: "Success" });
    } else if (result == 409) {
      return res.status(409).json({ code: 409, message: "Day already exists" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal Server Error" });
  }
}

async function Ops(plan_id: any, day: any, objectiveDetails: any) {
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    const checkDay =
      "select * from tbl_plan_details where plan_id = ? and day = ? and  is_exist='true'";
    const [checkDayResult]: any = await conn.query(checkDay, [plan_id, day]);

    if (checkDayResult.length == 0) {
      const insertDay =
        "insert into tbl_plan_details (plan_id,day) values (?,?)";
      const [insertDayResult]: any = await conn.query(insertDay, [
        plan_id,
        day,
      ]);
      await conn.commit();
      const plan_details_id = insertDayResult.insertId;
      objectiveDetails.map(async (objective: any) => {
        const insertObjective =
          "insert into tbl_plan_details_objectives (objective_name,type,plan_detail_id) values (?,?,?)";
        const [insertObjectiveResult]: any = await conn.query(insertObjective, [
          objective.objective_name,
          objective.objective_type,
          plan_details_id,
        ]);
        await conn.commit();
        const plan_details_objective_id = insertObjectiveResult.insertId;
        objective.item_details.map(async (item: any) => {
          const insertItem =
            "insert into tbl_objective_item_detail (item_id,plan_details_objectives,item_quantity) values (?,?,?)";
          const [insertItemResult]: any = await conn.query(insertItem, [
            item.item_id,
            plan_details_objective_id,
            item.item_quantity,
          ]);
          await conn.commit();
        });
      });
    } else {
      //Return that the day already exists
      return 409;
    }
    return 200;
  } catch (error) {
    await conn.rollback();
    return error;
  } finally {
    conn.release();
  }
}
