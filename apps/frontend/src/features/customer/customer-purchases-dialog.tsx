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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [customerName, onClose]);

  return (
    <dialog
      open
      className="fixed inset-0 m-auto p-6 border rounded-xl shadow-xl w-[800px]"
      aria-labelledby="dialog-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex justify-between items-center mb-4 ">
        <h2 id="dialog-title" className="text-xl font-bold">
          {customerName}님의 구매 내역
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="구매 내역 창 닫기">
          닫기
        </button>
      </div>
      <div className="space-y-4 overflow-auto max-h-[60dvh]" role="region" aria-label="구매 내역 목록">
        <Suspense
          fallback={
            <div role="status" aria-label="로딩 중">
              Loading...
            </div>
          }
        >
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
        <div
          key={purchase.date + purchase.imgSrc}
          className="flex gap-4"
          aria-label={`${purchase.date} ${purchase.product} 구매 내역`}
        >
          <img src={purchase.imgSrc} alt={purchase.product} className="aspect-square object-cover w-1/3" />
          <div aria-label="구매 날짜">{purchase.date}</div>
          <div aria-label="상품명">{purchase.product}</div>
          <div aria-label="가격">{purchase.price.toLocaleString()}원</div>
        </div>
      ))}
    </>
  );
}
