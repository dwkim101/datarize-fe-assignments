import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { DateRange } from "@components/date-range-picker";
import { getPurchaseFrequency } from "@api/purchase";
import { useSuspenseQuery } from "@hooks/useSuspenseQuery";

export function FrequencyChart({ range }: { range: DateRange }) {
  const frequencies = useSuspenseQuery(`purchase-frequency-${range.from}-${range.to}`, () =>
    getPurchaseFrequency({ from: range.from.toISOString(), to: range.to.toISOString() })
  );

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={frequencies?.map((frequency) => ({
            ...frequency,
            range: getRangeDisplayName(frequency.range),
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" height={60} interval={0} tick={{ fontSize: "0.7rem" }} />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value}건`, "구매 횟수"]} />
          <Bar dataKey="count" fill="#86efac" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function getRangeDisplayName(range: `${number} - ${number}`) {
  return `${range.split(" - ")[1].replace("0000", "")}만원 이하`;
}
