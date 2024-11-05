import { DatePicker } from "./date-picker";
import { min, max, format, isValid } from "date-fns";

export type DateRange = { from: Date; to: Date };

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

const formatDate = (date: Date) => {
  if (!isValid(date)) return "";
  return format(date, "yyyy-MM-dd");
};

export function DateRangePicker({ range, onChange }: DateRangePickerProps) {
  const handleChange = (target: "from" | "to") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const { from, to } = range;

    if (!newValue) return;

    const nextRange = {
      from: target === "from" ? min([new Date(newValue ?? from), new Date(to)]) : from,
      to: target === "to" ? max([new Date(newValue ?? to), new Date(from)]) : to,
    };

    onChange(nextRange);
  };

  return (
    <div className="flex gap-4">
      <DatePicker max={formatDate(range.to)} value={formatDate(range.from)} onChange={handleChange("from")} />
      <DatePicker min={formatDate(range.from)} value={formatDate(range.to)} onChange={handleChange("to")} />
    </div>
  );
}
