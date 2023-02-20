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
  const cage_id: number = Number(req.body.cage_id);
  // try {
  //   const data = await UpdateCage(cage_id);
  //   console.log(data);
  //   if (data.count != 1) {
  //     return res.status(404).json({
  //       code: 404,
  //       message:
  //         "Data update unsuccessful. Record not found or no changes made.",
  //     });
  //   }
  //   return res.status(200).json({ code: 200, message: "Removed successfully" });
  // } catch (error) {
  //   console.log(error);
  //   res
  //     .status(500)
  //     .json({ code: 500, message: "500 Server Error,Something went wrong." });
  // }
}

// async function UpdateCage(cage_id: number) {
//   console.log(cage_id)
//   const data = await prisma.tbl_cage.updateMany({
//     where: {
//       cage_id: cage_id,
//       is_exist: "true",
//     },
//     data: {
//       is_exist: "false",
//     },
//   });
//   return ;
// }
