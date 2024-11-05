import ErrorBoundary from "./components/error-boundary";
import { Card } from "./components/card";
import { Layout } from "./layout";
import FrequencyBoard from "./features/purchase/frequency-board";

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <FrequencyBoard />
        <ErrorBoundary>
          <Card>
            <Card.Title>가장 많이 구매한 고객 목록 및 검색 기능</Card.Title>
            <Card.Description>
              한 달 동안 가장 많이 구매한 고객을 내림차순/오름차순으로 정렬하여 보여주는 목록을 구현하세요. 기본 정렬은
              ID입니다. 각 고객의 ID, 이름, 총 구매 횟수, 총 구매 금액을 표시하세요. 고객의 이름을 통해서 검색 가능해야
              합니다.
            </Card.Description>
          </Card>
        </ErrorBoundary>
        <ErrorBoundary>
          <Card>
            <Card.Title>고객 ID 기반 상세 기능</Card.Title>
            <Card.Description>
              특정 고객 Row를 클릭하면 해당 고객의 상세 구매 내역을 표시할 수 있는 기능을 구현하세요. 검색 결과에는 해당
              고객의 구매 날짜, 구매한 제품 목록, 각 제품의 가격, 상품 썸네일이 포함되어야 합니다.
            </Card.Description>
          </Card>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
