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
  const data: any = await Ops();
  return res.status(200).json({ code: 200, data: data });
}

async function Ops() {
  const conn = await connection.getConnection();
  try {
    const getMaxBatchId = "select MAX(batch_id) as batch_id from tbl_batch";
    const [LatestBatchId] = await conn.query(getMaxBatchId);
    const getBoarList =
      "select * from tbl_pig INNER JOIN tbl_pig_history ON tbl_pig_history.pig_id=tbl_pig.pig_id  where pig_type='Boar' and tbl_pig.is_exist='true' and tbl_pig_history.pig_status='active'";
    const [BoarList] = await conn.query(getBoarList);
    const getSowList =
      "select * from tbl_pig INNER JOIN tbl_pig_history ON tbl_pig_history.pig_id=tbl_pig.pig_id   where pig_type='Sow' and tbl_pig.is_exist='true' and tbl_pig_history.pig_status='active'";
    const [SowList] = await conn.query(getSowList);
    const getPigletCage =
      "select * from tbl_cage where is_exist='true' and is_full='false' and cage_type='Nursery Pens'";
    const [PigletCageList] = await conn.query(getPigletCage);
    const getBreedList = "select * from tbl_breed where is_exist='true'";
    const [BreedList] = await conn.query(getBreedList);

    return {
      LatestBatchId: LatestBatchId,
      BoarList: BoarList,
      SowList: SowList,
      PigletCageList: PigletCageList,
      BreedList: BreedList,
    };
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
