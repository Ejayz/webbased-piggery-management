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
    const data: any = await UpdateCage();
    if (data.length != 0) {
      return res.status(200).json({ code: 200, data: data });
    } else {
      return res.status(404).json({ code: 404, message: "No type" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const selectType = "select * from tbl_operation_type where is_exist='true'";
    const [sqlSelectResult] = await conn.query(selectType);
    return sqlSelectResult;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
