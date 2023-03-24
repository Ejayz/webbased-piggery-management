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
  try {
    const result: any = await UpdateCage();
    if (result.length == 0) {
      res
        .status(404)
        .json({
          code: 404,
          message: "No item created on inventory.Create one first.",
        });
    } else {
      res.status(200).json({ code: 200, data: result });
    }
  } catch (error) {
    res.status(400).json({ code: 400, message: error });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const getAllItem = "select * from tbl_inventory  where is_exist='true'";
    const [getAllItemResult] = await conn.query(getAllItem);
    return getAllItemResult;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
