export function setLocal(otp: string) {
  localStorage.setItem("otp", otp);
}
export async function getLocal() {
  let otp = localStorage.getItem("otp");
  return otp;
}
export function removeLocal() {
  localStorage.removeItem("otp");
}
