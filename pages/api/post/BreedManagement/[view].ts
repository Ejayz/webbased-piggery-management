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
  const breed_id = req.query.view;
  const data: any = await ViewCage(breed_id);
  if (data.length != 0) {
    return res.status(200).json({ code: 200, data: data });
  } else {
    return res
      .status(404)
      .json({ code: 404, message: "404 Not Found. Breed do not exist" });
  }
}

async function ViewCage(breed_id: any) {
  const conn = await connection.getConnection();
  try {
    const sql = "select * from tbl_breed where is_exist='true' and breed_id=?";
    const [err, result] = await conn.query(sql, [breed_id]);
    conn.release();
    if (err) return err;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
