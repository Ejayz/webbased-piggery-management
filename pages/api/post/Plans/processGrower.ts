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
  const conn = await connection.getConnection();
  const { day, item_id } = req.body;
  const old_day = 0;
  try {
    const is_exist = await CheckWeaner(conn, day);
    if (is_exist.length > 0) {
      const hasExist = is_exist.length;
      const result = await Ops(conn, hasExist, day, item_id, is_exist[0].day);
      return res
        .status(200)
        .json({ code: 200, message: "Weaning day updated" });
    } else {
      const hasExist = is_exist.length;
      const result = await Ops(conn, hasExist, day, item_id, old_day);
      return res.status(200).json({ code: 200, message: "Weaning day added" });
    }
  } catch (error) {
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
  old_day: any
) {
  const insertWeaningDay =
    "INSERT INTO tbl_plan_details (plan_id,day,item_id,type) VALUES (3,?,?,'feeding')";
  const updateWeaningDay =
    "UPDATE tbl_plan_details SET day=? , item_id=? WHERE plan_id=3 and day=? and is_exist='true'";
  if (is_exist) {
    try {
      const [result] = await conn.query(updateWeaningDay, [
        day,
        item_id,
        old_day,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    try {
      const [result] = await conn.query(insertWeaningDay, [day, item_id]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      conn.release();
    }
  }
}

async function CheckWeaner(conn: any, day: any) {
  const checkWeaner =
    "SELECT * FROM tbl_plan_details WHERE plan_id=3 and day=? and is_exist='true'";
  try {
    const [result] = await conn.query(checkWeaner, day);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
