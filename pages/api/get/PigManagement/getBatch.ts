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
  // const data = await UpdateCage();
}

// async function UpdateCage() {
//   const returned = await prisma.tbl_cage.findMany({
//     where: {
//       is_exist: "true",
//       is_full: "false",
//     },
//     select: {},
//   });
//   console.log(returned);
// }
