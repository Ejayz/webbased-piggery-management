export const Create = async (breed_name: string) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    breed_name: breed_name,
  });

  let response = await fetch(
    `${location.origin}/api/post/BreedManagement/create`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
//Get Data
export const getData = async (
  page: any,
  sortby: any,
  sorts: any,
  keyword: string
) => {
  let headersList = {
    Accept: "*/*",
  };
  let response = await fetch(
    `${location.origin}/api/get/BreedManagement/${page}/?&sortby=${sortby}&sortorder=${sorts}&keyword=${keyword}`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data;
};

export const Search = async () => {};
export const sortData = async () => {};
export const Remove = async (breed_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    breed_id: breed_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/BreedManagement/remove`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
export const Update = async (breed_id: any, breed_name: string) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    breed_id: breed_id,
    breed_name: breed_name,
  });

  let response = await fetch(
    `${location.origin}/api/post/BreedManagement/update`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const View = async (breed_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    breed_id: breed_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/BreedManagement/view`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
