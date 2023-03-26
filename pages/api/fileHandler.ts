import { randomInt } from "crypto";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import fs from "fs";
import path from "path";
import { s3Client } from "./s3";

export default async function fildeHandler(req: NextApiRequest) {
  const bucket: any = process.env.BUCKET_NAME;

  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
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
    const pathToWriteImage = `public/attachments/${itemName}.${
      imageFile.mimetype.split("/")[1]
    }`;
    // include name and .extention, you can get the name from data.files.image object
    const originalFile = fs.readFileSync(imagePath);
    const bucketParams = {
      Bucket: "webbasedpiggeryuploaded",
      Key: pathToWriteImage,
      Body: originalFile,
      ACL: "public-read",
    };

    const run = async () => {
      try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));\
        console.log ("data", data);
      } catch (err) {
        console.log("Error", err);
      }
    };

    run();
    return { filePath: pathToWriteImage, fields: data.fields };
  } catch (error: any) {
    console.log(error);
    return false;
  }
}
