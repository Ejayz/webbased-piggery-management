import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import connection from "../mysql";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as cookie from "cookie";
import authorizationHandler from "../authorizationHandler";
import { prisma } from "../PrismaInit";
dotenv.config();
const jwt_key: any = process.env.JWT_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST", {
    cookieName: "reset_auth",
  });
  if (!authorized) {
    return false;
  }
  const { phone, username, password }: any = req.body;
  try {
    const hashedPass = await generateHased(password);
    console.log(hashedPass);
    const data = await resetPassword(phone, username, hashedPass);
    if (data.count == 0) {
      return res.status(404).json({
        code: 404,
        message:
          "Data update unsuccessful. Record not found or no changes made.",
      });
    }
    return res
      .status(200)
      .json({ code: 200, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "500 Server Error.Something went wrong." });
  }
}

async function resetPassword(
  phone: string,
  username: string,
  password: string
) {
  const data = await prisma.tbl_users.updateMany({
    where: {
      username: username,
      phone: phone,
    },
    data: { password: password },
  });
  return data;
}

async function generateHased(password: string) {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
