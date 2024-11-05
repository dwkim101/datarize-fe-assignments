import { useMemo } from "react";

const cache = new Map<string, WrapPromiseResult<unknown>>();

export function useSuspenseQuery<T>(queryKey: string, queryFn: () => Promise<T>) {
  return useMemo(() => {
    if (!cache.has(queryKey)) {
      cache.set(queryKey, wrapPromise(queryFn()));
    }

    return cache.get(queryKey) as WrapPromiseResult<T>;
  }, [queryFn, queryKey]);
}

type Status = "pending" | "success" | "error";

type WrapPromiseResult<T> = {
  read: () => T | undefined;
};

export function wrapPromise<T>(promise: Promise<T>): WrapPromiseResult<T> {
  let status: Status = "pending";
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      error = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw error;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
