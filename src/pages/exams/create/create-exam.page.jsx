import { Container } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/sidebar.component";
import CreateExamForm from "./create-exam-form.component";

const CreateExamPage = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <Container className="my-3">
          <CreateExamForm />
        </Container>
      </div>
    </div>
  );
};

export default CreateExamPage;
