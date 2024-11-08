/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense, useState, useTransition } from "react";

import { Card } from "@components/card";
import { DateRange, DateRangePicker } from "@components/date-range-picker";

import { FrequencyChart } from "./frequency-chart";
import { ErrorBoundary } from "@components/error-boundary";
import { invalidatePurchaseFrequency } from "./hooks/usePurchaseFrequency";

const DEFAULT_DATE_RANGE = () => ({ from: new Date("2024-07-01"), to: new Date("2024-07-30") });

export default function FrequencyBoard() {
  const [, startTransition] = useTransition();
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE());

  const handleDateRangeChange = (range: DateRange) => {
    startTransition(() => setDateRange(range));
  };

  const handleResetError = () => invalidatePurchaseFrequency(dateRange);

  return (
    <Card>
      <Card.Title>가격대별 구매 빈도 차트</Card.Title>
      <Card.Description>
        한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 보여주는 차트입니다.
        가격대는 2만원 이하부터 10만원 이상까지 만원 단위로 구분됩니다. 날짜 범위를 선택하여 특정 기간을 조회할 수
        있습니다. 2024년 7월 데이터를 기반으로 합니다.
      </Card.Description>
      <DateRangePicker range={dateRange} onChange={handleDateRangeChange} />
      <ErrorBoundary onReset={handleResetError}>
        <Suspense
          fallback={
            <div className="text-center animate-pulse bg-gray-900/20 flex h-96 items-center justify-center">
              Loading... Frequency Chart
            </div>
          }
        >
          <FrequencyChart range={dateRange} />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
}
