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
  const { cage_id, pig_id, remarks } = req.body;
  console.log(cage_id, pig_id, remarks);
  try {
    const data: any = await UpdateCage(cage_id, pig_id, remarks);
    if (data) {
      return res
        .status(200)
        .json({ code: 200, message: "Successfully quarantined." });
    } else {
      return res.status(404).json({ code: 404, message: "Create pig first." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error });
  }
}

async function UpdateCage(cage_id: any, pig_id: any, remarks: any) {
  const conn = await connection.getConnection();
  try {
    const getPigInfo =
      "select * from tbl_pig_history where pig_id=? and is_exist='true' order by pig_history_id desc limit 1";
    const [pigInfo]: any = await conn.query(getPigInfo, [pig_id]);
    console.log(pigInfo);
    const pig_tag = pigInfo[0].pig_tag;
    const weight = pigInfo[0].weight;
    const insertPigHistory =
      "insert into tbl_pig_history (pig_id,cage_id,pig_tag,weight,pig_status,remarks) values (?,?,?,?,?,?)";
    const [insertPigHistoryResult]: any = await conn.query(insertPigHistory, [
      pig_id,
      cage_id,
      pig_tag,
      weight,
      "Quarantined",
      remarks,
    ]);
    if (insertPigHistoryResult.affectedRows == 1) {
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
}
