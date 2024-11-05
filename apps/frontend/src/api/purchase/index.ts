import client from "@api/index";

type PurchaseFrequency = {
  range: `${number} - ${number}`;
  count: number;
};

type ISOString = string;

type GetPurchaseFrequencyParams = { from: ISOString; to: ISOString };

export const getPurchaseFrequency = async (dateRange: GetPurchaseFrequencyParams) => {
  const params = new URLSearchParams({ from: dateRange.from, to: dateRange.to }).toString();

  return client.get(`/api/purchase-frequency?${params}`).then((res) => res.data as Array<PurchaseFrequency>);
};
