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
    `${location.origin}/api/get/CageManagement/GetCage/${page}/?&sortby=${sortby}&sortorder=${sorts}&keyword=${keyword}`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data;
};
export const sortData = async (
  base_url: string | undefined,
  sortby: any,
  sorts: any
) => {
  if (base_url == null) {
    return;
  }

  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    sortby: sortby,
    sortorder: sorts,
  });

  let response = await fetch(
    `${base_url}/api/post/CageManagement/GetSortData/`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();

  return data;
};
export const Search = async (
  keyword: string,
  sortby: string,
  sorts: string,
  base_url: string | undefined
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    keyword: keyword,
    sortby: sortby,
    sortorder: sorts,
  });
  let response = await fetch(
    `${location.origin}/api/post/CageManagement/SearchCage/`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Create = async (
  cage_name: string,
  cage_capacity: number | string,
  cage_type: string
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    cage_name: cage_name,
    cage_capacity: cage_capacity,
    cage_type: cage_type,
  });

  let response = await fetch(
    `${location.origin}/api/post/CageManagement/AddCage/`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const View = async (cage_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `${location.origin}/api/post/CageManagement/ViewCage/${cage_id}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Update = async (
  cage_name: any,
  cage_id: any,
  cage_type: any,
  cage_capacity: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    cage_name: cage_name,
    cage_id: cage_id,
    cage_type: cage_type,
    cage_capacity: cage_capacity,
  });

  let response = await fetch(
    `${location.origin}/api/post/CageManagement/Update/`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Remove = async (cage_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    cage_id: cage_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/CageManagement/Remove/`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
