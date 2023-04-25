import { getCookie, getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import authorizationHandler from "../authorizationHandler";
import { decodeJWT, verifyJWT } from "../jwtProcessor";
import {connection} from "../mysql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const { sortby, sortorder }: any = req.body;
  const decode: any = await decodeJWT(authorized.cookie);
  const user_id = decode.user_id;
  // try {
  //   const data: any = await getSortedData({ sortby, sortorder, user_id });
  //   if (data.length == 0) {
  //     return res.status(404).json({ code: 404, message: "No user data found" });
  //   }
  //   return res.status(200).json({ code: 200, data: data });
  // } catch (error) {
  //   console.log(error);
  //   return res
  //     .status(500)
  //     .json({ code: 500, message: "500 Server Error.Something went wrong." });
  // }
}

// async function getSortedData({ sortby, sorter, user_id }: any) {
//   const data = await prismaCustomTbl_Users.tbl_users.findMany({
//     where: {
//       NOT: { user_id: user_id },
//       AND: {
//         is_exist: "true",
//       },
//     },
//     orderBy: {
//       [sortby]: sorter,
//     },
//   });

//   return data;
// }
