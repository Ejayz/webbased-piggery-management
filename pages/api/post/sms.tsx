import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
dotenv.config();

async function send_sms(phone: any, username: any) {
  let headersList = {};
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
    `Hi ${username} , You requested change password operation . Enter this otp to proceed OTP:{{otp}}`
  );

  let response = await fetch("https://smsgatewaydevices.com/api/send/otp", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  if (!response.ok) {
    throw error;
  }
  let data = await response.text();

  return JSON.parse(data);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  send_sms(req.body.phone, req.body.username)
    .then((data) => {
      console.log(data);
      if (data.status == 200) {
        res.status(200).json({
          code: 200,
          message: "OTP sent successfully",
          OTP: data.data.otp,
        });
      } else {
        res.status(500).json({ code: 500, message: "Server error" });
      }
    })
    .catch((e) => {
      res.status(500).json({ code: 500, message: `Server Error:${e.code}` });
    });
}
