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

export const getBreedList = async () => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch(
    `${location.origin}/api/post/BreedManagement/getBreedList`,
    {
      method: "POST",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Create = async (
  pig_id: any,
  cage_id: any,
  batch_id: any,
  breed_id: any,
  pig_tag: any,
  pig_type: any,
  birthdate: any,
  weight: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    pig_id: pig_id,
    cage_id: cage_id,
    batch_id: batch_id,
    breed_id: breed_id,
    pig_tag: pig_tag,
    pig_type: pig_type,
    birthdate: birthdate,
    weight: weight,
  });

  let response = await fetch(
    `${location.origin}/api/post/PigManagement/createBreeder`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const GetBatchId = async () => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({});

  let response = await fetch(
    `${location.origin}/api/post/PigManagement/getLastBatch`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
