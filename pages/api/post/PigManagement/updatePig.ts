import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import { connection } from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  try {
    const {
      cage_id,
      pig_id,
      pig_tag,
      weight,
      status,
      remarks,
      pig_type,
      batch_id,
    } = req.body;
    const users = await getUsers(authorized.cookie);
    const user_id = users.user_id;
    const data: any = await Ops(
      cage_id,
      pig_id,
      pig_tag,
      weight,
      status,
      remarks,
      user_id,
      pig_type,
      batch_id
    );
    if (data == 900) {
      return res
        .status(500)
        .json({ code: 500, message: "Cage is already full" });
    }
    return res.status(200).json({ code: 200, message: "Updated successfully" });
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
  status: any,
  remarks: any,
  user_id: any,
  pig_type: any,
  batch_id: any
) {
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    const getPigDetails =
      " SELECT * FROM tbl_pig INNER JOIN tbl_pig_history ON tbl_pig_history.pig_id = tbl_pig.pig_id WHERE tbl_pig.pig_id=? AND tbl_pig.is_exist='true' AND tbl_pig_history.pig_history_status='active'";
    const [pigDetails]: any = await conn.query(getPigDetails, [pig_id]);
    console.log(pigDetails);
    const getCage =
      "select * from tbl_cage where is_exist='true' and cage_id=?";
    const [CageData]: any = await conn.query(getCage, [cage_id]);
    if (CageData[0].is_full == "true" && cage_id != pigDetails[0].cage_id) {
      await conn.rollback();
      return 900;
    } else {
      const getPigDetails =
        " SELECT * FROM tbl_pig INNER JOIN tbl_pig_history ON tbl_pig_history.pig_id = tbl_pig.pig_id WHERE tbl_pig.pig_id=? AND tbl_pig.is_exist='true' AND tbl_pig_history.pig_history_status='active'";
      const [pigDetails]: any = await conn.query(getPigDetails, [pig_id]);
      const inActivateOld =
        "update tbl_pig_history set pig_history_status='inactive' where pig_id=? and is_exist='true' and pig_history_status='active'";
      const [inActivateOldR]: any = await conn.query(inActivateOld, [pig_id]);
      const insertNewPigDetails =
        "insert into tbl_pig_history (pig_id,cage_id,pig_tag,weight,pig_status,remarks,user_id,pig_type,batch_id) values (?,?,?,?,?,?,?,?,?)";

      const [updatePig]: any = await conn.query(insertNewPigDetails, [
        pig_id,
        cage_id,
        pig_tag,
        weight,
        status,
        remarks,
        user_id,
        pig_type,
        batch_id,
      ]);

      if (updatePig.affectedRows == 1) {
        console.log(pigDetails[0].cage_id);
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
    throw error;
  } finally {
    conn.release();
  }
}
