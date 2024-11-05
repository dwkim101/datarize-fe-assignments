import { ErrorBoundary as _ErrorBoundary, ErrorBoundaryProps as _ErrorBoundaryProps } from "react-error-boundary";
import { Fallback } from "@components/fallback";

type ErrorBoundaryProps = Omit<_ErrorBoundaryProps, "fallback" | "FallbackComponent">;

export const ErrorBoundary = ({ children, ...props }: ErrorBoundaryProps): JSX.Element => {
  return (
    <_ErrorBoundary fallbackRender={Fallback} {...props}>
      {children}
    </_ErrorBoundary>
  );
};
