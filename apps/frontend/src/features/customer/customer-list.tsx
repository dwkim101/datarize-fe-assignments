import { useState } from "react";

import { useSuspenseQuery } from "@hooks/useSuspenseQuery";
import { getCustomers, Customer } from "@api/customer/index";

import { CustomerPurchasesDialog } from "./customer-purchases-dialog";

interface CustomerListProps {
  sortBy?: "asc" | "desc";
  searchName?: string;
}

export function CustomerList({ sortBy, searchName }: CustomerListProps) {
  const [detailedCustomerId, setDetailedCustomerId] = useState<number | null>(null);
  const customers = useSuspenseQuery<Customer[]>(`customers-${sortBy}-${searchName}`, () =>
    getCustomers({ sortBy, name: searchName })
  );

  if (!customers?.length) {
    return <div className="text-center py-4">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="border">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">이름</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">총 구매 횟수</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">총 구매 금액</th>
          </tr>
        </thead>
        <tbody className="border divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="hover:bg-green-700/40 cursor-pointer"
              onClick={() => setDetailedCustomerId(customer.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.count}회</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.totalAmount.toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
      {detailedCustomerId && (
        <CustomerPurchasesDialog
          customerName={customers.find((customer) => customer.id === detailedCustomerId)?.name}
          customerId={detailedCustomerId}
          onClose={() => setDetailedCustomerId(null)}
        />
      )}
    </div>
  );
}
