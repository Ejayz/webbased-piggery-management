export const Create = async (stockList: any, file: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let bodyContent = new FormData();
  bodyContent.append("fields", JSON.stringify(stockList));
  bodyContent.append("attachment", file[0]);

  let response = await fetch(`${location.origin}/api/post/StockCard/restock`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const Destock = async (
  stock_id: any,
  item_id: any,
  quantity: any,
  remarks: any,
  item_net_weight: any
) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    stock_id: stock_id,
    item_id: item_id,
    quantity: quantity,
    remarks: remarks,
    item_net_weight: item_net_weight,
  });

  let response = await fetch(`${location.origin}/api/post/StockCard/destock`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};

export const CancelRestock = async (restock_id: any) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    restock_id: restock_id,
  });

  let response = await fetch(
    `${location.origin}/api/post/StockCard/cancelRestock`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
