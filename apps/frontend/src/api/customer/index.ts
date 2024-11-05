import client from "@api/index";

export interface Customer {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}

type GetCustomersParams = {
  sortBy?: "asc" | "desc";
  name?: string;
};

export const getCustomers = async (params?: GetCustomersParams) => {
  const queryParams = new URLSearchParams();

  if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
  if (params?.name) queryParams.set("name", params.name);

  const queryString = queryParams.toString();
  const url = `/api/customers${queryString ? `?${queryString}` : ""}`;

  return client.get(url).then((res) => res.data as Customer[]);
};