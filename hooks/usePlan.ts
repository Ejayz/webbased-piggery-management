export const createPlan = async (plan_name: any, activity_list: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    plan_name: plan_name,
    activity_list: activity_list,
  });

  let response = await fetch(`${location.origin}/api/post/Plans/createPlans`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const createPlanObjectives = async (
  plan_id: any,
  day: any,
  objectiveDetails: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    plan_id: plan_id,
    day: day,
    objectiveDetails: objectiveDetails,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/createPlanObjectives`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
export const UpdateObjectiveItem = async (
  objective_item_detail: any,
  item_id: any,
  item_quantity: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    objective_item_detail: objective_item_detail,
    item_id: item_id,
    item_quantity: item_quantity,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/UpdatePlanItems`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const UpdateObjective = async (
  objective_name: any,
  objective_type: any,
  objective_detail_id: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    objective_name: objective_name,
    plan_detail_id: objective_detail_id,
    objective_type: objective_type,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/UpdateObjective/UpdateObjective`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const RemoveObjectiveItem = async (objective_item_detail: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    objective_item_detail: objective_item_detail,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/removeObjectiveItem`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const RemoveObjective = async (plan_detail_objectives: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    plan_detail_objectives: plan_detail_objectives,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/removeObjective`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const RemoveDay = async (plan_detail_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    plan_detail_id: plan_detail_id,
  });

  let response = await fetch(`${location.origin}/api/post/Plans/RemoveDay`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const RemovePlan = async (plan_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    plan_id: plan_id,
  });

  let response = await fetch(`${location.origin}/api/post/Plans/removePlans`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const processWeaner = async (day: any, item_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    day: day,
    item_id: item_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/processWeaner`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
export const processGrower = async (day: any, item_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    day: day,
    item_id: item_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/processGrower`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const processFinisher = async (day: any, item_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    day: day,
    item_id: item_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/Plans/processFinisher`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
