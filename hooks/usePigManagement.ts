import { randomInt } from "crypto";

export const getData = async (page: number, sortby: String, sorts: string) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch(
    `${location.origin}/api/get/PigManagement/GetPigs/${page}?sortby=${sortby}&sortorder=${sorts}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  console.log(data);
  return data;
};

export const sortData = async () => {};
export const Search = async () => {};

export const IdGenerator = async () => {
  let selection = "abcdefghijklmnopqrstuvwxyz1234567890";
  let split_selection = selection.split("");
  let id = "pig_";
  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * split_selection.length);
    id = id + split_selection[rand];
  }
  return id;
};

export const GetCages = async () => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let bodyContent = new FormData();
  bodyContent.append("data", "[{},{},{}]");
  bodyContent.append("attachment", "c:UsersEjayz-SuperDocumentsai(1).png");

  let response = await fetch(
    `${location.origin}/api/post/CageManagement/getAllCage`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
