import { Remove } from "@/hooks/useBreedManagement";
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
  const { item_id } = req.body;
  const data: any = await RemoveInventory(item_id);
  if (data.affectedRows !== 0) {
    return res.status(200).json({ code: 200, message: "Removed successfully" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Errorr,Something went wrong." });
  }
}

async function RemoveInventory(item_id: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "update tbl_inventory set is_exist='false' where item_id=? and is_exist='true'";
      conn.query(sql, [item_id], (err, result, feilds) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
      
    });
  });
}
