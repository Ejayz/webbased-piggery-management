import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "GET");
  if (!authorized) {
    return false;
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const getAllData = "select * from tbl_plan_details where plan_id=?";
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
