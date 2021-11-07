import { useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/sidebar.component";
import UpdateExamForm from "./update-exam-form.component";
import EditQuestion from "../../../components/edit-question/edit-question.component";
import CreateQuestion from "../../../components/create-question/create-question.component";
import ElementContainer from "./element-container.component";
import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";
import { UpdateExamContext } from "../../../contexts/update-exam/update-exam.context";

const UpdateExamPage = () => {
  const [addQuestionFormVisible, setAddQuestionFormVisible] = useState(false);
  const { examId, questions, addQuestion, isLoading, isPublished } = useContext(
    UpdateExamContext
  );

  if (isLoading) {
    return <p> Loading... </p>;
  }
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
                  addQuestion(questionObject);
                  setAddQuestionFormVisible(false);
                }}
              />
            ) : (
              <Button
                className="w-100"
                onClick={() => setAddQuestionFormVisible(true)}
                disabled={isPublished}
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
