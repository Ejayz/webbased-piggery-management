export const stringGenerator = () => {
  const string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 10;

  for (let i = 0; i < length; i++) {
    result += string.charAt(Math.floor(Math.random() * string.length));
  }
  return result;
};
