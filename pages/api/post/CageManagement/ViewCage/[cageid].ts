import { PrismaClient } from "@prisma/client";
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
  const cageid: Number = Number(req.query.cageid);
  try {
    const data: any = await ViewCage(cageid);
    if (data.length == 0) {
      return res.status(404).json({ code: 404, message: "Details not found." });
    }
    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    console.log("Catch:" + error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server error.Something went wrong" });
  }
}

async function ViewCage(cage_id: any) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "select * from tbl_cage where cage_id=? AND is_exist='true' AND is_full='false'";
      conn.query(sql, [cage_id], (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
        conn.release();
      });
    });
  });
}
