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
}

async function UpdateCage(cage_id: number) {
  const data = await prisma.cage.updateMany({
    where: {
      cage_id: cage_id,
      is_exist: "true",
    },
    data: {
      is_exist: "false",
    },
  });
}
