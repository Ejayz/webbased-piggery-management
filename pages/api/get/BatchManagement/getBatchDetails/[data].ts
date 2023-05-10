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
  const { data }: any = req.query;
  const datas: any = await UpdateCage(data);
  try {
    if (datas.batch_details.length != 0) {
      return res.status(200).json({ code: 200, data: datas });
    } else {
      return res
        .status(404)
        .json({ code: 404, message: "No Data found realated to :" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong." });
  }
}

async function UpdateCage(batch_id: any) {
  const conn = await connection.getConnection();
  try {
    const [data] = await conn.query(
      "select * from tbl_batch where batch_id=?",
      [batch_id]
    );
    const [pig_data] = await conn.query(
      "select * from tbl_pig INNER JOIN tbl_pig_history ON tbl_pig.pig_id=tbl_pig_history.pig_id INNER JOIN tbl_cage ON tbl_cage.cage_id=tbl_pig_history.cage_id where tbl_pig_history.batch_id=? and tbl_pig_history.pig_history_status='active'",
      [batch_id]
    );
    return {
      batch_details: data,
      pig_details: pig_data,
    };
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    conn.release();
  }
}
