import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/sidebar.component";
import UpdateExamForm from "./update-exam-form.component";
import EditQuestion from "../../../components/edit-question/edit-question.component";
import ElementContainer from "./element-container.component";

const UpdateExamPage = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <Container className="my-3">
          <ElementContainer>
            <UpdateExamForm examId={examId} />
          </ElementContainer>
          {questions.map((question) => {
            return (
              <ElementContainer>
                <EditQuestion examId={examId} />
              </ElementContainer>
            );
          })}
          <Button
            className="w-100"
            onClick={() =>
              setQuestions((currentQuestions) => [...currentQuestions, {}])
            }
          >
            Add Question
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default UpdateExamPage;
