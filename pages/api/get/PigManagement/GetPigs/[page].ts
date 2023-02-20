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
  const { page, sortby, sortorder }: any = req.query;
  if (page == "0") {
    return res
      .status(404)
      .json({ code: 404, message: "Page 0 data cannot be found" });
  }
  const limit: number = 5;
  const offset: number = limit * (parseInt(page) - 1);
  // try {
  //   const data: any = await UpdateCage(page, sortby, sortorder, offset, limit);
  //   if (data.length == 0) {
  //     return res.status(404).json({ code: 404, message: "Data not found" });
  //   }
  //   return res.status(200).json({ code: 200, data: data });
  // } catch (error) {
  //   console.log(error);
  //   return res
  //     .status(500)
  //     .json({ code: 500, messenger: "500 Server error. Something went wrong" });
  // }
}

// async function UpdateCage(
//   page: number,
//   sortby: string,
//   sorts: string,
//   skip: number,
//   take: number
// ) {
//   // const data = await prisma.tbl_pig.findMany({
//   //   where: { is_exist: "true" },
//   //   orderBy: [
//   //     {
//   //       [sortby]: sorts,
//   //     },
//   //   ],
//   //   skip: skip,
//   //   take: take,
//   // });
//   // return data;
// }
