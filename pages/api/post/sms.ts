import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import connection from "../mysql";
import * as jwt from 'jsonwebtoken'
import { signJWT } from "../jwtProcessor";
dotenv.config();

const jwt_secret: any = process.env.JWT_KEY

async function send_sms(phone: any, username: any) {
  console.log("sending otp-" + new Date());
  let sms = {};
  if (phone.includes("+63")) {
    phone = phone.replace("+63", "0");
  }
  console.log(phone);
  const device_api: any = process.env.DEVICE_API;
  const sms_api: any = process.env.API_KEY_SMS;
  let bodyContent = new FormData();
  bodyContent.append("secret", sms_api);
  bodyContent.append("type", "sms");
  bodyContent.append("phone", `+63${phone}`);
  bodyContent.append("mode", "devices");
  bodyContent.append("device", device_api);
  bodyContent.append("sim", "1");
  bodyContent.append(
    "message",
    `Hi ${username} , You requested change password operation . This OTP is only valid on this session do not refresh or reload the page . Enter this otp to proceed OTP:{{otp}}`
  );

  let responses = await fetch("https://smsgatewaydevices.com/api/send/otp", {
    method: "POST",
    body: bodyContent,
    headers: sms,
  });

  if (!responses.ok) {
    console.log(
      "request sent but something went wront-" + responses + new Date()
    );
    return responses.text;
  }
  let data = await responses.text();
  console.log("opt sent-" + responses.text + new Date());
  return JSON.parse(data);
}

async function VerifySms(username: string, phone: string) {
  return new Promise((resolve, rejects) => {
    const query = "select * from tbl_users where username=? and phone=? and is_exist='true'"
    connection.getConnection((err, conn) => {
      conn.query(query, [username, phone], (err, result, fields) => {
        if (err) rejects(err)
        resolve(result)
        console.log(result)
      })
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, username } = req.body;
  VerifySms(username, phone)
    .then((result: any) => {
      const data = result.length;
      console.log(data)
      try {
        if (data == 1) {
          send_sms(phone, username)
            .then((data) => {
              if (data.status == 200) {
                const token = signJWT(req.body)
                res.setHeader('Set-Cookie', `reset_auth=${token}; Max-Age=3600; HttpOnly; Path=/;`)
                res.status(200).json({
                  code: 200,
                  message: "OTP sent successfully",
                  OTP: data.data.otp,
                });

                return 0;
              } else {
                res.status(500).json({ code: 500, message: "Server error" });
                return 0;
              }
            })
            .catch((e) => {
              res
                .status(500)
                .json({ code: 500, message: `Server Error:${e.code}` });
              return 0;
            });
          return 0;
        } else {
          res.status(401).json({
            code: 401,
            message: "Username/Number do not match from our system record.",
          });
          return 0;
        }
      } catch (err: any) {
        if (err instanceof TypeError) {
          res.status(401).json({
            code: 401,
            message: "Username/Number do not match from our system record.",
          });
          return 0;
        }
        res.status(500).json({ code: 401, message: err.message });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ code: 500, message: "500 Server error,Please try again" });
    });
}
