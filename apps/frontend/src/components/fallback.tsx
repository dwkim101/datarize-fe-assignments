import { isClientError } from "@api/index";
import { FallbackProps } from "react-error-boundary";

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4 border border-red-500 rounded">
      <h2 className="text-red-500 font-bold mb-2">오류가 발생했습니다</h2>
      <span className="block whitespace-pre-wrap text-sm">
        {isClientError(error) ? error.response?.data.error : error?.message}
      </span>
      <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        다시 시도
      </button>
    </div>
  );
}
