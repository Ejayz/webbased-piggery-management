import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import connection from "pages/api/mysql";

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
  const {
    pig_id,
    cage_id,
    batch_id,
    breed_id,
    pig_tag,
    pig_type,
    birthdate,
    weight,
  }: any = req.body;
  try {
    const data: any = await Ops(
      pig_id,
      cage_id,
      batch_id,
      breed_id,
      pig_tag,
      pig_type,
      birthdate,
      weight,
      user_id
    );
    console.log(data);
    if (data.affectedRows >= 1) {
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
  pig_id: any,
  cage_id: any,
  batch_id: any,
  breed_id: any,
  pig_tag: any,
  pig_type: any,
  birthdate: any,
  weight: any,
  user_id: any
) {
  const conn = await connection.getConnection();
  conn.beginTransaction();
  try {
    const sql =
      "INSERT INTO `piggery_management`.`tbl_pig` (`pig_id`,  `batch_id`, `breed_id` ,`pig_type`, `birthdate`,user_id ) VALUES ( ?, ?,?, ?, ?,?);";
    await conn.query(sql, [
      pig_id,
      batch_id,
      breed_id,
      pig_type,
      birthdate,
      user_id,
    ]);
    const insertPigHistory =
      "insert into tbl_pig_history (pig_id,pig_tag,weight,cage_id,user_id) values(?,?,?,?,?)";
    await conn.query(insertPigHistory, [
      pig_id,
      pig_tag,
      weight,
      cage_id,
      user_id,
    ]);
    const getCageCapacity =
      "select * from tbl_cage where cage_id=? and is_exist='true' and is_full='false'";
    const [result]: any = await conn.query(getCageCapacity, [cage_id]);
    if (result.length == 0) {
      conn.rollback();
      conn.release;
      return { affectedRows: 0 };
    } else if (result[0].cage_capacity! >= result[0].current_caged) {
      let updatedCage = result[0].current_caged + 1;
      if (result[0].cage_capacity == updatedCage) {
        const updateCage =
          "update tbl_cage set current_caged=? , is_full='true' where is_exist='true' and cage_id=?";
        const [result] = await conn.query(updateCage, [updatedCage, cage_id]);
      } else {
        const updateCage =
          "update tbl_cage set current_caged=?  where is_exist='true' and cage_id=?";
        const [result] = await conn.query(updateCage, [updatedCage, cage_id]);
      }
      const updateBatch =
        "update tbl_batch set batch_capacity=`batch_capacity`+1 where batch_id=? and is_exist='true'";
      const [resultBatch]: any = await conn.query(updateBatch, [batch_id]);
      if (resultBatch.affectedRows == 0) {
        conn.rollback();
        conn.release;
        return { affectedRows: 0 };
      } else {
        conn.commit();
        conn.release();
        return { affectedRows: 1 };
      }
    } else {
      conn.rollback();
      conn.release();
      return { affectedRows: 0 };
    }
  } catch (error) {
    conn.rollback();
    conn.release;
    console.log(error);
    return { affectedRows: 0 };
  } finally {
    conn.release();
  }
}
