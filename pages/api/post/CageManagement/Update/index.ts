import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
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
  const cage_id: number = req.body.cage_id;
  const cage_name: string = req.body.cage_name;
  const cage_type: string = req.body.cage_type;
  const cage_capacity: number = Number(req.body.cage_capacity);

  try {
    const data: any = await UpdateCage(
      cage_id,
      cage_name,
      cage_type,
      cage_capacity
    );

    if (data.affectedRows != 1) {
      return res.status(404).json({
        code: 404,
        message: "Data update unsuccessful. Record might not exist.",
      });
    }
    return res.status(200).json({ code: 200, message: "Updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ Code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function UpdateCage(
  cage_id: number,
  cage_name: string,
  cage_type: string,
  cage_capacity: number
) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) reject(err);
      const sql =
        "UPDATE `tbl_cage` SET  `cage_name`=?, `cage_type`=?, `cage_capacity`=? WHERE `cage_id`=? and is_exist='true';";
      conn.query(
        sql,
        [cage_name, cage_type, cage_capacity, cage_id],
        (err, result, field) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  });
}
