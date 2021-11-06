import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/sidebar.component";
import UpdateExamForm from "./update-exam-form.component";
import EditQuestion from "../../../components/edit-question/edit-question.component";
import CreateQuestion from "../../../components/create-question/create-question.component";
import ElementContainer from "./element-container.component";
import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import { questionsIndexRequest } from "../../../services/questions/questions.service";

const UpdateExamPage = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [addQuestionFormVisible, setAddQuestionFormVisible] = useState(false);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!token) {
      return;
    }
    questionsIndexRequest(examId, token)
      .then((response) => response.data.data)
      .then(({ questions }) => setQuestions(questions))
      .catch((err) => console.error(err));
  }, [examId, token]);

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <Container className="my-3">
          <ElementContainer>
            <UpdateExamForm examId={examId} />
          </ElementContainer>
          <QuestionTypesProvider>
            {questions.map((question) => {
              return (
                <ElementContainer key={question.question_id}>
                  <EditQuestion
                    examId={examId}
                    questionId={question.question_id}
                  />
                </ElementContainer>
              );
            })}
            {addQuestionFormVisible ? (
              <CreateQuestion
                examId={examId}
                addQuestion={(questionObject) => {
                  setQuestions((prevQuestions) => [
                    ...prevQuestions,
                    questionObject,
                  ]);
                  setAddQuestionFormVisible(false);
                }}
              />
            ) : (
              <Button
                className="w-100"
                onClick={() => setAddQuestionFormVisible(true)}
              >
                Add Question
              </Button>
            )}
          </QuestionTypesProvider>
        </Container>
      </div>
    </div>
  );
};

export default UpdateExamPage;
