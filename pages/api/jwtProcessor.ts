import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { rejects } from "assert";
dotenv.config();

const secret: any = process.env.JWT_KEY;

async function verifyJWT(token: any) {
  const isVerified = jwt.verify(token, secret);

  if (isVerified) {
    return true;
  } else {
    return false;
  }
}

async function decodeJWT(token: any) {
  return new Promise((resolve, rejects) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) rejects(err);
      resolve(decoded);
    });
  });
}
async function signJWT(signables: Object) {
  return jwt.sign(signables, secret);
}

export { verifyJWT, decodeJWT, signJWT };
