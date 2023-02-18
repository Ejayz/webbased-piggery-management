export const getData = async (page: any, sortby: any, sorts: any) => {
  let headersList = {
    Accept: "*/*",
  };
  let response = await fetch(
    `${location.origin}/api/get/UserManagement/${page}/?&sortby=${sortby}&sortorder=${sorts}`,
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
