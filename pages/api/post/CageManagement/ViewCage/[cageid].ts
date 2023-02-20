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
  // try {
  //   const data: any = await ViewCage(cageid);
  //   if (data == null) {
  //     return res.status(404).json({ code: 404, message: "Details not found." });
  //   }
  //   return res.status(200).json({ code: 200, data: data });
  // } catch (error) {
  //   console.log("Catch:" + error);
  //   return res
  //     .status(500)
  //     .json({ code: 500, message: "500 Server error.Something went wrong" });
  // }
}

// async function ViewCage(cage_id: any) {
//   const data = await prisma.tbl_cage.findFirst({
//     where: {
//       cage_id: cage_id,
//       is_exist: "true",
//     },
//   });
//   return data;
// }
