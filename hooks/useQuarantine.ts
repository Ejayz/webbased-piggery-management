export const QuarantinePig = async (
  cage_id: any,
  pig_id: any,
  remarks: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    cage_id: cage_id,
    pig_id: pig_id,
    remarks: remarks,
  });

  let response = await fetch(`/api/post/Quarantine/quarantinePig`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};
