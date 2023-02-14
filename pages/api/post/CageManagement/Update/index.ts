import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import connection from "pages/api/mysql";
import { prisma } from "pages/api/PrismaInit";

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

    console.log(data);
    if (data.count != 1) {
      return res.status(404).json({
        code: 404,
        message:
          "Data update unsuccessful. Record not found or no changes made.",
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
  const data = await prisma.tbl_cage.updateMany({
    where: {
      cage_id: cage_id,
      is_exist: "true",
    },
    data: {
      cage_name: cage_name,
      cage_type: cage_type,
      cage_capacity: cage_capacity,
    },
  });
  return data;
}
