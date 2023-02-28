export const VerifyUser = async (
  username: string,
  password: string,
  remember_me: boolean,
  job: string
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username: username,
    password: password,
    rememberme: remember_me,
    job: job,
  });

  let response = await fetch(`${location.origin}/api/post/login`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};
