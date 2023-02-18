import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import { decodeJWT } from "pages/api/jwtProcessor";
import connection from "pages/api/mysql";
import { prisma } from "pages/api/PrismaInit";

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
  const decoded: any = await decodeJWT(authorized.cookie);
  const user_id: any = decoded.user_id;
  const limit: number = 5;
  const offset: number = limit * (parseInt(page) - 1);

  try {
    const data = await GetUsers(limit, offset, user_id, sortby, sortorder);
    if (data.length == 0) {
      return res.status(404).json({ code: 404, message: "No data found" });
    }
    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function GetUsers(
  limit: number,
  offset: number,
  user_id: number,
  sortby: string,
  sortorder: string
) {
  const data = await prisma.tbl_users.findMany({
    where: {
      NOT: { user_id: user_id },
      AND: { is_exist: "true" },
    },
    orderBy: {
      [sortby]: sortorder,
    },
    skip: offset,
    take: limit,
    select: {
      user_id: true,
      username: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      job: true,
      phone: true,
    },
  });

  return data;
}
