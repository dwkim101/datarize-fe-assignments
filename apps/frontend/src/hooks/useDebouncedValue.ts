import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number = 300) {
  const [originalValue, setOriginalValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(originalValue), delay);
    return () => clearTimeout(handler);
  }, [value, delay, originalValue]);

  return { debouncedValue, value: originalValue, setValue: setOriginalValue };
}
