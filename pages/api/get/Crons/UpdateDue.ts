import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { verifyJWT } from "pages/api/jwtProcessor";
import {connection} from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.authorization == undefined) {
    return res.status(401).send("Unauthorized");
  }
  const Bearer = req.headers.authorization?.split(" ")[1];
  const token: string | boolean = await verifyJWT(Bearer);
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const rows = await UpdateCage();
    return res.send(rows);
  } catch (error) {
    console.log(error);
  }
}

async function UpdateCage() {
  const updateSetDue =
    "UPDATE tbl_operation SET status='overdue' WHERE operation_date < DATE(NOW()) AND status='pending' ";
  const conn = await connection.getConnection();
  try {
    const [updateSetDueRows]: any = await conn.query(updateSetDue);
    return updateSetDueRows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}
