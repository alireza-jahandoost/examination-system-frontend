import { useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import ProfileContainer from "../../../components/profile-container/profile-container.component";
import UpdateExamForm from "./update-exam-form.component";
import EditQuestion from "../../../components/edit-question/edit-question.component";
import CreateQuestion from "../../../components/create-question/create-question.component";
import ElementContainer from "./element-container.component";
import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";
import { UpdateExamContext } from "../../../contexts/update-exam-context/update-exam.context";

const UpdateExamPage = () => {
  const [addQuestionFormVisible, setAddQuestionFormVisible] = useState(false);
  const {
    exam,
    examId,
    questions,
    addQuestion,
    deleteQuestion,
    isLoading,
    isPublished,
    publishExam,
    unpublishExam,
  } = useContext(UpdateExamContext);

  if (isLoading || !exam) {
    return <p> Loading... </p>;
  }
  return (
    <ProfileContainer>
      <div className="text-start mb-5">
        <ElementContainer>
          <Button
            onClick={() => {
              if (!isPublished) {
                publishExam();
              } else {
                unpublishExam();
              }
            }}
          >
            {isPublished ? "unpublish" : "publish"} exam
          </Button>
        </ElementContainer>
        <ElementContainer>
          <UpdateExamForm examId={examId} />
        </ElementContainer>
        <QuestionTypesProvider>
          {questions.map((question) => {
            return (
              <ElementContainer key={question.question_id}>
                <EditQuestion
                  readOnly={isPublished}
                  examId={examId}
                  questionId={question.question_id}
                  deleteQuestion={() => deleteQuestion(question.question_id)}
                />
              </ElementContainer>
            );
          })}
          {addQuestionFormVisible ? (
            <ElementContainer>
              <CreateQuestion
                readOnly={isPublished}
                examId={examId}
                addQuestion={(questionObject) => {
                  addQuestion(questionObject);
                  setAddQuestionFormVisible(false);
                }}
              />
            </ElementContainer>
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
      </div>
    </ProfileContainer>
  );
};

export default UpdateExamPage;
