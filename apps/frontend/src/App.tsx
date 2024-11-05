import { Suspense } from "react";
import ErrorBoundary from "./components/error-boundary";
import { useSuspenseQuery } from "./hooks/useSuspenseQuery";

function App() {
  return (
    <ErrorBoundary>
      <div>Hello World</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

function Component() {
  const res = useSuspenseQuery(
    "test",
    () =>
      new Promise<string>((res) => {
        setTimeout(() => {
          if (Math.random() < 0.5) res("Hello");
          else res("Not implemented");
        }, 1200);
      })
  );

  return <div>{res.read()}</div>;
}

export default App;
