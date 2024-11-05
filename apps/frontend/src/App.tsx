import { Layout } from "./layout";
import FrequencyBoard from "./features/purchase/frequency-board";
import { CustomerBoard } from "./features/customer/customer-board";
import { ErrorBoundary } from "@components/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <FrequencyBoard />
        <CustomerBoard />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
