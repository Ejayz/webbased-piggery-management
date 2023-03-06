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
}

async function UpdateCage() {
  const conn = await connection.getConnection();
  const sql =
    "INSERT INTO `piggery_management`.`tbl_pig` (`pig_id`, `cage_id`, `batch_id`, `pig_tag`, `pig_type`, `birthdate`, ) VALUES (?, ?, ?, ?, ?, ?, ?);";
}
