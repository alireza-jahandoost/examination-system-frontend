import { Container } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/sidebar.component";

const OverviewPage = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">
          <h1>Profile Overview</h1>
        </div>
      </Container>
    </div>
  );
};

export default OverviewPage;
