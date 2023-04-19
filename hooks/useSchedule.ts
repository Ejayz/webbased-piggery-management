export const CreateIndividualSchedule = async (pig_id: any, item_list: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    pig_id: pig_id,
    item_list: item_list,
  });

  let response = await fetch("/api/post/Schedule/CreateScheduleIndividual", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const ConfirmIndividualSchedule = async (
  operation_id: any,
  quantity: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    operation_id: operation_id,
    quantity: quantity,
  });

  let response = await fetch("/api/post/Schedule/Confirm", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const CreateCageSchedule = async (cage_id: any, item_list: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    cage_id: cage_id,
    item_list: item_list,
  });

  let response = await fetch("/api/post/Schedule/CreateScheduleCage", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const CreateBatchSchedule = async (cage_id: any, item_list: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    cage_id: cage_id,
    item_list: item_list,
  });

  let response = await fetch("/api/post/Schedule/CreateScheduleBatch", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const UpdateOperationItem = async (item_id: any, operation_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    item_id: item_id,
    operation_id: operation_id,
  });

  let response = await fetch("/api/post/Schedule/updateItem", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const CancelSchedule = async (operation_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    operation_id: operation_id,
  });

  let response = await fetch("/api/post/Schedule/cancelSchedule", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};
