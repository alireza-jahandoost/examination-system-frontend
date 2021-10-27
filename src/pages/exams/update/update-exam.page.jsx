import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/sidebar.component";
import UpdateExamForm from "./update-exam-form.component";

const UpdateExamPage = () => {
  const { examId } = useParams();
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <Container className="my-3">
          <UpdateExamForm examId={examId} />
        </Container>
      </div>
    </div>
  );
};

export default UpdateExamPage;
