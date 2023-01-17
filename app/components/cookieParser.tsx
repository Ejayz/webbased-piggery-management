export default function searchCookie(cookies: string, key: String) {
  const keyValuePairs = cookies.split("; ");
  for (const pair of keyValuePairs) {
    const [cookieKey, cookieValue] = pair.split("=");
    if (cookieKey === key) {
      return cookieValue;
    }
  }
  return null;
}
