export default function searchCookie(cookies: string, key: String) {
  try {
    const keyValuePairs = cookies.split("; ");
    for (const pair of keyValuePairs) {
      const [cookieKey, cookieValue] = pair.split("=");
      if (cookieKey === key) {
        return cookieValue;
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}
