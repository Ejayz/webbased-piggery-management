import { DateTime } from "luxon";
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
  const { details } = req.body;
  const date = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
  const data: any = await CreateReorder(date, details);
  if (data == 200) {
    res.status(200).json({
      code: 200,
      message: "Reorder list was create and SMS was alread sent to owner.",
    });
  } else {
    res
      .status(500)
      .json({ code: 500, message: "500 Server Error. Something went wrong." });
  }
}

async function CreateReorder(date: string, details: any) {
  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    const [result]: any = await conn.query(
      "INSERT INTO tbl_reorder (reorder_date) VALUES (?)",
      [date]
    );
    const reorder_id = result.insertId;
    for (let i = 0; i < details.length; i++) {
      const { item_id, quantity } = details[i];
      const [result] = await conn.query(
        "INSERT INTO tbl_reorder_details ( reorder_id,item_id, reorder_quantity) VALUES (?, ?, ?)",
        [reorder_id, item_id, quantity]
      );
      console.log(result);
    }
    await conn.commit();
    conn.release();
    return 200;
  } catch (err) {
    console.log(err);
    await conn.rollback();
    return 500;
  }
}
