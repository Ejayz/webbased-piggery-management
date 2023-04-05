export const CreateIndividualSchedule = async (
  operation_type_id: any,
  operation_date: any,
  pig_id: any,
  item_list: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    operation_type_id: operation_type_id,
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

export const ConfirmIndividualSchedule = async (operation_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    operation_id: operation_id,
  });

  let response = await fetch("/api/post/Schedule/Confirm", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const CreateCageSchedule = async (
  operation_type_id: any,
  operation_date: any,
  cage_id: any,
  item_list: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    operation_type_id: operation_type_id,
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

export const CreateBatchSchedule = async (
  operation_type_id: any,
  operation_date: any,
  cage_id: any,
  item_list: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    operation_type_id: operation_type_id,
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
