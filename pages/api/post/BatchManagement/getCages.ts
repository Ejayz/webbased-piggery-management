import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { connection } from "pages/api/mysql";

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

    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong." });
  }
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  try {
    const [getCages] = await conn.query(
      "select * from tbl_cage where is_full='false' "
    );

    return getCages;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
