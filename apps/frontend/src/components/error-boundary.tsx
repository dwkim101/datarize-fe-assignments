import { Component } from "react";
import { ClientError, isClientError } from "@api/index";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (props: { error?: Error | ClientError; resetErrorBoundary: () => void }) => React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({ error: this.state.error, resetErrorBoundary: this.resetErrorBoundary });
      }
      return (
        <div className="p-4 border border-red-500 rounded">
          <h2 className="text-red-500 font-bold mb-2">오류가 발생했습니다</h2>
          <span className="block whitespace-pre-wrap text-sm">
            {isClientError(this.state.error) ? this.state.error.response?.data.error : this.state.error?.message}
          </span>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
