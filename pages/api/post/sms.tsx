import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
dotenv.config();
const secret: any = process.env.HASURA_KEY;

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
  console.log("Validating username and email-" + new Date());
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "x-hasura-admin-secret": secret,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username: username,
    phone: phone,
  });

  let response = await fetch("http://localhost:8080/api/rest/forgotpassword", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  console.log("Username and Phone number validated -" + new Date());
  return JSON.parse(data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, username } = req.body;

  VerifySms(username, phone)
    .then((api_result) => {
      const data = api_result.piggery_tbl_users;
      try {
        if (data[0].is_exist) {
          send_sms(phone, username)
            .then((data) => {
              if (data.status == 200) {
                console.log(data);
                res.status(200).json({
                  code: 200,
                  message: "OTP sent successfully",
                  OTP: data.data.otp,
                });

                return 0;
              } else {
                console.log(data);
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
            conde: 401,
            mesage: "Username/Number do not match from our system record.",
          });
          return 0;
        }
      } catch (err: any) {
        if (err instanceof TypeError) {
          res.status(401).json({
            code: 401,
            mesage: "Username/Number do not match from our system record.",
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
