import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomInt } from "crypto";
import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import authorizationHandler from "pages/api/authorizationHandler";
import {connection} from "pages/api/mysql";
import { bucket, s3Client } from "pages/api/s3";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await authorizationHandler(req, res, "POST");
  if (!authorized) {
    return false;
  }
  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      console.log(fields, files);
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  let itemName = "";
  for (let i = 0; i < 10; i++) {
    itemName = randomInt(0, 9).toString() + itemName;
  }
  try {
    const imageFile = data.files.attachment; // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
    const imagePath: any = imageFile.filepath;
    console.log(imagePath);
    const pathToWriteImage = `public/attachments/${itemName}.${
      imageFile.mimetype.split("/")[1]
    }`;
    // include name and .extention, you can get the name from data.files.image object
    const originalFile = fs.readFileSync(imagePath);
    console.log(originalFile);
    const bucketParams = {
      Bucket: bucket,
      Key: pathToWriteImage,
      Body: originalFile,
      ACL: "public-read",
    };

    const run = async () => {
      try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        console.log(
          "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
      } catch (err) {
        console.log("Error", err);
      }
    };

    run();

    console.log(data);
    return res.status(200).json({ code: 200, filePath: pathToWriteImage });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message });
  }
}
