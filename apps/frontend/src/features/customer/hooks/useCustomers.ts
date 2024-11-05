import { invalidateQuery, useSuspenseQuery } from "@hooks/useSuspenseQuery";
import { getCustomers, Customer, GetCustomersParams } from "@api/customer/index";
import { isClientError } from "@api/index";

export function useCustomers(params?: GetCustomersParams) {
  return useSuspenseQuery<Customer[]>(`customers-${params?.sortBy}-${params?.name}`, () =>
    getCustomers(params).catch((error) => {
      console.error(error);
      if (isClientError(error) && error.response?.data.error === "Customer not found") {
        return [];
      }
      throw error;
    })
  );
}

export function invalidateCustomers(params?: GetCustomersParams) {
  invalidateQuery(`customers-${params?.sortBy}-${params?.name}`);
}
