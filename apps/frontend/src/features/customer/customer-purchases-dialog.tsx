import { getCustomerPurchases } from "@api/customer";
import { useSuspenseQuery } from "@hooks/useSuspenseQuery";
import { Suspense, useEffect } from "react";

interface CustomerItemProps {
  customerName?: string;
  customerId: number;
  onClose: () => void;
}

export function CustomerPurchasesDialog({ customerName, customerId, onClose }: CustomerItemProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <dialog open className="fixed inset-0 m-auto p-6 border rounded-xl shadow-xl w-[800px]">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-bold">{customerName}님의 구매 내역</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          닫기
        </button>
      </div>
      <div className="space-y-4 overflow-auto max-h-[60dvh]">
        <Suspense fallback={<div>Loading...</div>}>
          <PurchaseList customerId={customerId} />
        </Suspense>
      </div>
    </dialog>
  );
}

function PurchaseList({ customerId }: { customerId: number }) {
  const purchases = useSuspenseQuery(`/api/customers/${customerId}/purchases`, () => getCustomerPurchases(customerId));

  return (
    <>
      {purchases?.map((purchase) => (
        <div key={purchase.date + purchase.imgSrc} className="flex gap-4">
          <img src={purchase.imgSrc} alt={purchase.product} className="aspect-square object-cover w-1/3" />
          <div>{purchase.date}</div>
          <div>{purchase.product}</div>
          <div>{purchase.price.toLocaleString()}원</div>
        </div>
      ))}
    </>
  );
}
