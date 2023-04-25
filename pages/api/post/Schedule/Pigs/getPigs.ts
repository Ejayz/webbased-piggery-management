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
  try {
    const { keyword } = req.query;

    const data: any = await UpdateCage(keyword);
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res.status(404).json({ code: 404, message: "Create pig first." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(keyword: any) {
  const conn = await connection.getConnection();
  try {
    const keywords = `%${keyword}%`;
    const sqlSelect = `SELECT * FROM tbl_pig INNER JOIN tbl_pig_history ON tbl_pig.pig_id=tbl_pig_history.pig_id INNER JOIN tbl_batch ON tbl_batch.batch_id=tbl_pig.batch_id INNER JOIN tbl_cage ON tbl_cage.cage_id=tbl_pig_history.cage_id WHERE (tbl_pig.pig_id LIKE ?) AND tbl_pig_history.pig_status='active' AND tbl_pig_history.status="active" AND tbl_pig_history.is_exist='true' AND tbl_pig_history.pig_history_status='active' AND tbl_pig.is_exist='true'`;
    const [sqlSelectResult] = await conn.query(sqlSelect, [keywords]);
    console.log(sqlSelectResult)
    return sqlSelectResult;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
