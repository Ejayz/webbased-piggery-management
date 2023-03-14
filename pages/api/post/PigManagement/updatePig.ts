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
  try {
    const { cage_id, pig_id, pig_tag, weight, status } = req.body;
    const data: any = await Ops(cage_id, pig_id, pig_tag, weight, status);
    return res.status(200).json({ code: 200, message: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function Ops(
  cage_id: any,
  pig_id: any,
  pig_tag: any,
  weight: any,
  status: any
) {
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    const getCage =
      "select * from tbl_cage where is_exist='true' and cage_id=?";
    const [CageData]: any = await conn.query(getCage, [cage_id]);
    if (CageData[0].is_full == "true") {
      await conn.rollback();
      return "Cage is already full";
    } else {
      const getPigDetails =
        " SELECT * FROM tbl_pig WHERE pig_id=? AND is_exist='true' AND status='active'";
      const [pigDetails]: any = await conn.query(getPigDetails, [pig_id]);
      const setNewPigDetails =
        " UPDATE tbl_pig SET cage_id=?, pig_tag=?, weight=?, status=? WHERE pig_id=? AND is_exist='true' AND status='active' ";
      const [updatePig]: any = await conn.query(setNewPigDetails, [
        cage_id,
        pig_tag,
        weight,
        status,
        pig_id,
      ]);
      if (updatePig.affectedRows == 1) {
        const deductOldCage =
          "Update tbl_cage set is_full='false'  ,current_caged=`current_caged`-1 where cage_id=? and is_exist='true'";
        const [deductOldCageR]: any = await conn.query(deductOldCage, [
          pigDetails[0].cage_id,
        ]);
        if (deductOldCageR.affectedRows == 1) {
          let total = CageData[0].current_caged + 1;
          if (total >= CageData[0].cage_capacity) {
            const addNewCage =
              "Update tbl_cage set is_full='true' ,current_caged=`current_caged`+1 where cage_id=? and is_exist='true'";
            const [addNewCageR]: any = await conn.query(addNewCage, [cage_id]);
            if (addNewCageR.affectedRows == 1) {
              await conn.commit();
              return "Pig Updated";
            } else {
              await conn.rollback();
              return "Pig Update Failed";
            }
          } else {
            const addNewCage =
              "Update tbl_cage set current_caged=`current_caged`+1 where cage_id=? and is_exist='true'";
            const [addNewCageR]: any = await conn.query(addNewCage, [cage_id]);
            if (addNewCageR.affectedRows == 1) {
              await conn.commit();
              return "Pig Updated";
            } else {
              await conn.rollback();
              return "Pig Update Failed";
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    await conn.rollback();
    return error;
  } finally {
    conn.release();
  }
}
