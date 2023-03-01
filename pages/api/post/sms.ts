import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import connection from "../mysql";
import * as jwt from "jsonwebtoken";
import { signJWT } from "../jwtProcessor";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twillioPhone = process.env.TWILIO_PHONE_NUMBER;
import * as twilio from "twilio";

dotenv.config();
const client = new twilio.Twilio(accountSid, authToken);
const jwt_secret: any = process.env.JWT_KEY;

async function send_sms(phone: any, username: any) {
  let sms = {};
  let otp = generateOTP();
  let completePhone = `+63${phone}`;
  const data = await client.messages.create({
    body: `Hi ${username},You requested a password change. Use this One Time Password(OTP):${otp} to authenticate this request.`,
    from: twillioPhone,
    to: completePhone,
  });
  // const data = { status: "sent" };
  if (data.status === "queued" || data.status === "sent") {
    return {
      status: 200,
      data: data,
      otp: otp,
    };
  } else {
    return {
      status: data.status,
      data: data,
    };
  }
}

async function VerifySms(username: string, phone: string, job: string) {
  return new Promise((resolve, rejects) => {
    const query =
      "select * from tbl_users where username=? and phone=? and job=? and is_exist='true'";
    connection.getConnection((err, conn) => {
      conn.query(query, [username, phone, job], (err, result, fields) => {
        if (err) rejects(err);
        resolve(result);
      });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, username, job } = req.body;

  const token = await signJWT(req.body);

  VerifySms(username, phone, job)
    .then((result: any) => {
      const data = result.length;
      try {
        if (data == 1) {
          send_sms(phone, username)
            .then((data) => {
              console.log(data);
              if (data.status == 200) {
                res.setHeader(
                  "Set-Cookie",
                  `reset_auth=${token}; Max-Age=3600; HttpOnly; Path=/;`
                );

                return res.status(200).json({
                  code: 200,
                  message: "OTP sent successfully",
                  OTP: data.otp,
                });
              } else {
                return res
                  .status(500)
                  .json({ code: 500, message: "Server error" });
              }
            })
            .catch((e) => {
              return res
                .status(500)
                .json({ code: 500, message: `Server Error:${e.code}` });
            });
        } else {
          return res.status(401).json({
            code: 401,
            message: "Username/Number do not match from our system record.",
          });
          return 0;
        }
      } catch (err: any) {
        if (err instanceof TypeError) {
          return res.status(401).json({
            code: 401,
            message: "Username/Number do not match from our system record.",
          });
          return 0;
        }
        return res.status(500).json({ code: 401, message: err.message });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ code: 500, message: "500 Server error,Please try again" });
    });
}
function generateOTP() {
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += Math.floor(Math.random() * 10);
  }
  return OTP;
}
