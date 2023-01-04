import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

async function send_sms(phone: any, username: any) {
  let headersList = {};

  let bodyContent = new FormData();
  bodyContent.append("secret", "6328b02e2407a3c8949d32712a216c3a86019baf");
  bodyContent.append("type", "sms");
  bodyContent.append("phone", `+63${phone}`);
  bodyContent.append("mode", "devices");
  bodyContent.append("device", "00000000-0000-0000-f9a3-3157ce0939bd");
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
