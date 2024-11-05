import { getPurchaseFrequency } from "@api/purchase";
import { useSuspenseQuery } from "@hooks/useSuspenseQuery";
import { DateRange } from "@components/date-range-picker";

export function FrequencyChart({ range }: { range: DateRange }) {
  const data = useSuspenseQuery(`purchase-frequency-${range.from}-${range.to}`, () =>
    getPurchaseFrequency({ from: range.from.toISOString(), to: range.to.toISOString() })
  );

  return (
    <>
      {data?.map((item) => (
        <div
          key={item.range}
          className="flex whitespace-nowrap border bg-green-400/30 items-center gap-2"
          style={{ width: `${item.count * 2}%` }}
        >
          {item.range}: {item.count}
        </div>
      ))}
    </>
  );
}
