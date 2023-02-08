import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
}

function UpdateUsername({ password }: any) {
  var sql = "";
  if (password != "") {
    sql =
      "UPDATE `tbl_users` SET `user_id`=?, `username`=?, `password`=?, `first_name`=?, `middle_name`=?, `last_name`=?, `phone`=?, `job`=?, `is_exist`=? WHERE `user_id`=?;";
  } else {
    sql =
      "UPDATE `tbl_users` SET `user_id`=?, `username`=?,  `first_name`=?, `middle_name`=?, `last_name`=?, `phone`=?, `job`=?, `is_exist`=? WHERE `user_id`=?;";
  }
}
