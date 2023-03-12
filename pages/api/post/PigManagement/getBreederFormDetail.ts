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
  const data = await Ops();
  return res.status(200).json({ code: 200, data: data });
}

async function Ops() {
  const conn = await connection.getConnection();
  try {
    const getIndividualCage =
      "select * from tbl_cage where is_exist='true' and is_full='false' and cage_type='Individual Stalls'";
    const [CageList] = await conn.query(getIndividualCage);
    const getBreedList = "select * from tbl_breed where is_exist='true'";
    const [BreedList] = await conn.query(getBreedList);
    return {
      CageList: CageList,
      BreedList: BreedList,
    };
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    conn.release();
  }
}
