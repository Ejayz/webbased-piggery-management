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
  const { pig_id, cage_id } = req.body;
  console.log("pig_id: " + pig_id + " cage_id: " + cage_id);
  try {
    const data: any = await Ops(pig_id, cage_id);
    return res.status(200).json({ code: 200, message: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function Ops(pig_id: any, cage_id: any) {
  const conn = await connection.getConnection();

  await conn.beginTransaction();
  try {
    const removePig =
      "UPDATE tbl_pig SET is_exist='false' WHERE pig_id=? and is_exist='true'";
    const [removePigResult]: any = await conn.query(removePig, [pig_id]);
    if (removePigResult.affectedRows == 1) {
      const updateCage =
        "Update tbl_cage set current_caged=`current_caged`-1 where cage_id=? and is_exist='true'";
      const [updateCageResult]: any = await conn.query(updateCage, [cage_id]);
      console.log(updateCageResult);
      if (updateCageResult.affectedRows == 1) {
        conn.commit();
        return "Pig successfully removed";
      } else {
        return "Failed to remove pig";
      }
    } else {
      return "Failed to remove pig";
    }
  } catch (error) {
    await conn.rollback();
    return error;
  } finally {
    await conn.release();
  }
}
