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
    `${location.origin}/api/get/UserManagement/${page}/?&sortby=${sortby}&sortorder=${sorts}&keyword=${keyword}`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  const data = await response.json();
  return data;
};

export const sortData = async (sortby: string, sorts: string) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    sortby: sortby,
    sortorder: sorts,
  });

  let response = await fetch(`${location.origin}/api/post/getSortedUsers`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
};

export const Search = async (
  keyword: string,
  sortby: string,
  sorts: string
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
    `${location.origin}/api/post/UserManagement/SearchUser/`,
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
  username: string,
  password: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  phone: string,
  job: string,
  user_id: string
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username: username,
    password: password,
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    phone: phone,
    job: job,
    user_id: user_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/UserManagement/UpdateUser`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const Remove = async (user_id: string) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    user_id: user_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/UserManagement/RemoveUser`,
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
  username: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  password: string,
  phone: string,
  job: string
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    username: username,
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    password: password,
    phone: phone,
    job: job,
  });

  let response = await fetch(
    `${location.origin}/api/post/UserManagement/AddUser/`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  let data = await response.json();
  return data;
};

export async function ViewUser(id: string | null) {
  let headersList = {
    Accept: "*/*",
  };

  let response = await fetch(
    `${location.origin}/api/post/UserManagement/view_user/${id}`,
    {
      method: "POST",
      headers: headersList,
    }
  );
  let data = await response.json();
  return data;
}
