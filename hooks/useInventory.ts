export const GetCategory = async () => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let response = await fetch(`${location.origin}/api/get/getCategory`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const Create = async (
  item_name: string,
  category_id: any,
  item_description: string,
  item_unit: any,
  item_net_weight: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    item_name: item_name,
    category_id: category_id,
    item_description: item_description,
    item_unit: item_unit,
    item_net_weight: item_net_weight,
  });

  let response = await fetch(
    `${location.origin}/api/post/InventoryManagement/create`,
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
    `${location.origin}/api/get/InventoryManagement/${page}/?&sortby=${sortby}&sortorder=${sorts}&keyword=${keyword}`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data;
};
export const sortData = async () => {};
export const Search = async () => {};
export const Remove = async (item_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    item_id: item_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/InventoryManagement/remove`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
export const Update = async (
  item_id: any,
  item_name: string,
  category_id: any,
  item_description: string
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    item_id: item_id,
    item_name: item_name,
    category_id: category_id,
    item_description: item_description,
  });

  let response = await fetch(
    `${location.origin}/api/post/InventoryManagement/update`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
export const View = async (item_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    item_id: item_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/InventoryManagement/view`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
