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
    const sqlSelect = `SELECT * FROM tbl_batch where (batch_name LIKE ?) and is_exist='true'`;
    const [sqlSelectResult] = await conn.query(sqlSelect, [keywords]);
    return sqlSelectResult;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
