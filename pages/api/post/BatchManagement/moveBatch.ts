import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { getUsers } from "pages/api/getUserDetails";
import { connection } from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const users = await getUsers(authorized.cookie);
  const user_id = users.user_id;
  const reqBody = req.body;
  const parsed = JSON.parse(reqBody);
  try {
    const data: any = await UpdateCage(
      parsed.batch_id,
      parsed.cage_id,
      user_id
    );
    return res.status(200).json({ code: 200, message: "Batch moved" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong." });
  }
}

async function UpdateCage(batch_id: any, cage_id: any, user_id: any) {
  const conn = await connection.getConnection();
  try {
    const [selectPig]: any = await conn.query(
      "SELECT * FROM tbl_pig_history where pig_history_status='active' and batch_id=?",
      [batch_id]
    );
    console.log(selectPig);

    await Promise.all(
      selectPig.map(async (item: any) => {
        const [updateHistory] = await conn.query(
          "update tbl_pig_history set pig_history_status='inactive' where pig_history_id=?",
          [item.pig_history_id]
        );
        console.log(item);
        const [insertPigHistory] = await conn.query(
          "insert into tbl_pig_history (pig_id,cage_id,pig_tag,weight,batch_id,pig_history_status,remarks,user_id,pig_type) values (?,?,?,?,?,?,?,?,?)",
          [
            item.pig_id,
            cage_id,
            item.pig_tag,
            item.weight,
            item.batch_id,
            "active",
            "Moved to cage",
            user_id,
            item.pig_type,
          ]
        );
        const [updateCageCapacity] = await conn.query(
          "update tbl_cage set current_caged=current_caged+1 where cage_id=?",
          [cage_id]
        );
        const [updateCageCapacity2] = await conn.query(
          "update tbl_cage set current_caged=current_caged-1 where cage_id=?",
          [item.cage_id]
        );
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
