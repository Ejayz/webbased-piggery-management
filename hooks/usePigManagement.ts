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
