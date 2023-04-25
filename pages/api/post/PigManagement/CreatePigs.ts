import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const {
    batch_id,
    boar_id,
    sow_id,
    pig_type,
    birth_date,
    breed_id,
    batch_name,
    pigData,
  } = req.body;
  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;

  const data = await Ops(
    batch_id,
    boar_id,
    sow_id,
    pig_type,
    birth_date,
    breed_id,
    pigData,
    batch_name,
    user_id
  );
  try {
    if (data == 200) {
      return res.status(200).json({ code: 200, message: "Pigs Created" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "500 Server error.Something went wrong." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong." });
  }
}

async function Ops(
  batch_id: any,
  boar_id: any,
  sow_id: any,
  pig_type: any,
  birth_date: any,
  breed_id: any,
  pigData: any,
  batch_name: any,
  user_id: any
) {
  const conn = await connection.getConnection();
  conn.beginTransaction();
  try {
    let batch_capacity = pigData.length;
    const insertBatch =
      "insert into tbl_batch (batch_id,batch_name,boar_id,sow_id,batch_capacity,user_id) values(?,?,?,?,?,?)";
    await conn.query(insertBatch, [
      batch_id,
      batch_name,
      boar_id,
      sow_id,
      batch_capacity,
      user_id,
    ]);
    pigData.map(async (value: any, key: number) => {
      const getCageCapacity =
        "select * from tbl_cage where cage_id=? and is_exist='true' and is_full='false'";
      const [result]: any = await conn.query(getCageCapacity, [value.cage_id]);
      if (result.length == 0) {
        conn.rollback();
        conn.release;
        return { affectedRows: 0 };
      } else if (result[0].cage_capacity! >= result[0].current_caged) {
        let updatedCage = result[0].current_caged + 1;
        if (result[0].cage_capacity == updatedCage) {
          const updateCage =
            "update tbl_cage set current_caged=? , is_full='true' where is_exist='true' and cage_id=?";
          const [result] = await conn.query(updateCage, [
            updatedCage,
            value.cage_id,
          ]);
        } else {
          const updateCage =
            "update tbl_cage set current_caged=?  where is_exist='true' and cage_id=?";
          const [result] = await conn.query(updateCage, [
            updatedCage,
            value.cage_id,
          ]);
        }
      }
      const insertPig =
        "insert into tbl_pig (pig_id,batch_id,breed_id,birthdate,user_id) values(?,?,?,?,?)";
      await conn.query(insertPig, [
        value.pig_id,
        batch_id,
        breed_id,
        birth_date,
        user_id,
      ]);
      const insertPigHistory =
        "insert into tbl_pig_history (pig_id,pig_tag,weight,cage_id,user_id,pig_type) values(?,?,?,?,?,?)";
      await conn.query(insertPigHistory, [
        value.pig_id,
        value.pig_tag,
        value.pig_weight,
        value.cage_id,
        user_id,
        pig_type,
      ]);
    });

    conn.commit();
    conn.release();
    return 200;
  } catch (error) {
    console.log(error);
    conn.rollback();
    conn.release;
    return 500;
  } finally {
    conn.release();
  }
}
