import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorize = await authorizationHandler(req, res, "POST");
  if (!authorize) {
    return false;
  }
  const { user_id } = req.body;
  const data = RemoveUser({ user_id });
  console.log(data);
}

async function RemoveUser({ user_id }: any) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `tbl_users` SET  `is_exist`='true' WHERE `user_id`=?;";
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      conn.query(sql, [user_id], (err, result, feild) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
