import { decodeJWT } from "./jwtProcessor";

export const getUsers = async (cookie: any) => {
  const data = await decodeJWT(cookie);
  return data;
};
