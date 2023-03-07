import { randomInt } from "crypto";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";
import fs from "fs/promises";
import path from "path";

export default async function fildeHandler(req: NextApiRequest) {
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
    console.log(imagePath);
    const pathToWriteImage = path.join(
      "public\\attatchments",
      `${itemName}.${imageFile.mimetype.split("/")[1]}`
    ); // include name and .extention, you can get the name from data.files.image object

    const image = await fs.readFile(imagePath);
    await fs.writeFile(pathToWriteImage, image);
    //store path in DB
    return { filePath: pathToWriteImage, fields: data.fields };
  } catch (error: any) {
    console.log(error);
    return false;
  }
}
