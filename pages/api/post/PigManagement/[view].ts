import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
  const { view } = req.query;
  try {
    const data: any = await Ops(view);

    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res.status(404).json({ code: 404, message: "Pig Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function Ops(pig_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql = `SELECT *
  FROM tbl_pig
  INNER JOIN tbl_pig_history ON tbl_pig.pig_id = tbl_pig_history.pig_id
  INNER JOIN tbl_cage ON tbl_pig_history.cage_id = tbl_cage.cage_id
  INNER JOIN tbl_batch ON tbl_pig.batch_id = tbl_batch.batch_id
  INNER JOIN tbl_breed ON tbl_pig.breed_id = tbl_breed.breed_id WHERE tbl_pig.pig_id=? AND tbl_pig.is_exist='true' AND tbl_pig_history.pig_history_status='active'`;
    const result = await conn.query(sql, [pig_id]);
    return result[0];
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
