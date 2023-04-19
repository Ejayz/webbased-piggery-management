import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import { decodeJWT } from "pages/api/jwtProcessor";
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

  const conn = await connection.getConnection();
  const { from_day, to_day, item_id } = req.body;
  const old_day = 0;
  conn.beginTransaction();
  try {
    for (let i = from_day; i <= to_day; i++) {
      const is_exist = await CheckWeaner(conn, i);
      const result = await Ops(conn, is_exist, i, item_id, old_day, user_id);
    }
    conn.commit();
    return res
      .status(200)
      .json({ code: 200, message: "Plan detail was set successfully" });
  } catch (error) {
    conn.rollback();
    console.log(error);
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  } finally {
    conn.release();
  }
}

async function Ops(
  conn: any,
  is_exist: any,
  day: any,
  item_id: any,
  old_day: any,
  user_id: any
) {
  const insertWeaningDay =
    "INSERT INTO tbl_plan_details (plan_id,day,item_id,type,user_id) VALUES (3,?,?,'feeding',?)";
  const updateWeaningDay =
    "UPDATE tbl_plan_details SET day=? , user_id=?, item_id=? WHERE plan_id=3 and day=? and is_exist='true'";

  if (is_exist.length !== 0) {
    try {
      const [result] = await conn.query(updateWeaningDay, [
        day,
        user_id,
        item_id,
        day,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    try {
      const [result] = await conn.query(insertWeaningDay, [
        day,
        item_id,
        user_id,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

async function CheckWeaner(conn: any, day: any) {
  const checkWeaner =
    "SELECT * FROM tbl_plan_details WHERE plan_id=3 and day=? and is_exist='true'";
  try {
    const [result] = await conn.query(checkWeaner, day);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
