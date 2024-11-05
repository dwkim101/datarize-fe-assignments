import { Suspense, useState, useTransition } from "react";
import { Card } from "@components/card";
import { CustomerList } from "./customer-list";
import { ErrorBoundary } from "@components/error-boundary";

export function CustomerBoard() {
  const [, startTransition] = useTransition();
  const [sortBy, setSortBy] = useState<"asc" | "desc" | undefined>();
  const [searchName, setSearchName] = useState("");

  const handleSort = (value: "asc" | "desc" | undefined) => {
    startTransition(() => setSortBy(value));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);
  };

  return (
    <Card>
      <Card.Title>고객 구매 목록</Card.Title>
      <Card.Description>
        고객별 구매 통계를 확인할 수 있습니다. 이름으로 검색하거나 구매 금액 기준으로 정렬할 수 있습니다.
      </Card.Description>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="고객 이름 검색..."
          value={searchName}
          onChange={handleSearch}
          className="p-2 border rounded"
        />
        <select
          value={sortBy || ""}
          onChange={(e) => handleSort(e.target.value as "asc" | "desc" | undefined)}
          className="p-2 border rounded"
        >
          <option value="">ID 순</option>
          <option value="asc">구매 금액 낮은 순</option>
          <option value="desc">구매 금액 높은 순</option>
        </select>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <CustomerList sortBy={sortBy} searchName={searchName} />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
}
