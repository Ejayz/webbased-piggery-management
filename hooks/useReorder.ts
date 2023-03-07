export const getLowLvl = async () => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/InventoryList`,
    {
      method: "POST",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Create = async (details: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    details: details,
  });

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/create`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const getTotalReorderList = async () => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({});

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/getReorderTotalList`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
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
    `${location.origin}/api/get/Reorder_Management/${page}/?&sortby=${sortby}&sortorder=${sorts}&keyword=${keyword}`,
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
export const Remove = async (reorder_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    reorder_id: reorder_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/remove`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const getSpecificOrderList = async (reorder_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    reorder_id: reorder_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/getSpecificOrderList`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Confirm = async (file: any, reorder_id: any, details: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let bodyContent = new FormData();
  bodyContent.append("details", JSON.stringify(details));
  bodyContent.append("reorder_id", reorder_id);
  bodyContent.append("attachment", file[0]);

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/Confirm`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
export const Lock = async (reorder_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    reorder_id: reorder_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/ReorderListManagement/LockReorderList`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
