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
  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;
  const { batch_id, batch_name, BreederList, arrivalDate }: any = req.body;
  try {
    const insertBatch = await createBatch(
      batch_name,
      BreederList.length,
      user_id
    );
    const data: any = await Ops(
      BreederList,
      batch_id,
      batch_name,
      arrivalDate,
      user_id
    );
    console.log(data);
    if (data) {
      return res
        .status(200)
        .json({ code: 200, message: "Created successfully" });
    } else {
      return res.status(500).json({
        code: 500,
        message: "A problem occurred or the cage is already full.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ code: 500, message: "500 Server error, Something went long" });
  }
}

async function Ops(
  BreederList: any,
  batch_id: any,
  batch_name: any,
  arrivalDate: any,
  user_id: any
) {
  const conn = await connection.getConnection();
  conn.beginTransaction();
  try {
    await Promise.all(
      BreederList.map(async (breeder: any) => {
        const sql =
          "INSERT INTO `piggery_management`.`tbl_pig` (`pig_id`,   `breed_id` , `birthdate`,user_id ) VALUES ( ?, ?,?,?);";
        await conn.query(sql, [
          breeder.pig_id,

          breeder.breed_id,
          arrivalDate,
          user_id,
        ]);
        const insertPigHistory =
          "insert into tbl_pig_history (pig_id,pig_tag,weight,cage_id,user_id,pig_type,batch_id) values(?,?,?,?,?,?,?)";
        await conn.query(insertPigHistory, [
          breeder.pig_id,
          breeder.pig_tag,
          breeder.weight,
          breeder.cage_id,
          user_id,
          breeder.pig_type,
  breeder.batch_id
        ]);
        const getCageCapacity =
          "select * from tbl_cage where cage_id=? and is_exist='true' and is_full='false'";
        const [result]: any = await conn.query(getCageCapacity, [
          breeder.cage_id,
        ]);
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
              breeder.cage_id,
            ]);
          } else {
            const updateCage =
              "update tbl_cage set current_caged=?  where is_exist='true' and cage_id=?";
            const [result] = await conn.query(updateCage, [
              updatedCage,
              breeder.cage_id,
            ]);
          }
        } else {
          conn.rollback();
          conn.release();
          return { affectedRows: 0 };
        }
      })
    );
    conn.commit();
    return true;
  } catch (error) {
    conn.rollback();
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}

async function createBatch(batch_name: any, batch_capacity: any, user_id: any) {
  const insertBatch =
    "insert into tbl_batch (batch_name,batch_capacity,batch_type,user_id) values(?,?,'breeder',?)";
  const [result]: any = await connection.query(insertBatch, [
    batch_name,
    batch_capacity,
    user_id,
  ]);
  return result.insertId;
}
