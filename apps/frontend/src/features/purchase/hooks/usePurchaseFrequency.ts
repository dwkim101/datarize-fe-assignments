import { getPurchaseFrequency } from "@api/purchase";
import { DateRange } from "@components/date-range-picker";
import { invalidateQuery, useSuspenseQuery } from "@hooks/useSuspenseQuery";

const createQueryKey = (range: DateRange) => `purchase-frequency-${range.from}-${range.to}`;

export function usePurchaseFrequency(range: DateRange) {
  return useSuspenseQuery(createQueryKey(range), () =>
    getPurchaseFrequency({ from: range.from.toISOString(), to: range.to.toISOString() })
  );
}

export function invalidatePurchaseFrequency(range: DateRange) {
  invalidateQuery(createQueryKey(range));
}
