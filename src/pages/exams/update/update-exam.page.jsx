import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import UpdateExamForm from "./update-exam-form.component";
import EditQuestion from "../../../components/edit-question/edit-question.component";
import CreateQuestion from "../../../components/create-question/create-question.component";
import ElementContainer from "./element-container.component";
import { QuestionTypesProvider } from "../../../contexts/question-types-context/question-types.context";
import { UpdateExamContext } from "../../../contexts/update-exam-context/update-exam.context";
import { BsExclamationTriangle } from "react-icons/bs";
import programRoutes from "../../../constants/program-routes.constant";

const UpdateExamPage = () => {
  const [addQuestionFormVisible, setAddQuestionFormVisible] = useState(false);
  const {
    exam,
    examId,
    questions,
    addQuestion,
    deleteQuestion,
    isPublished,
    publishExam,
    unpublishExam,
    isPublishStateChanging,
  } = useContext(UpdateExamContext);

  if (!exam) {
    return <p> Loading... </p>;
  }
  return (
    <div className="text-start mb-5">
      <ElementContainer>
        <div className="d-flex flex-column">
          <div>
            <Button
              variant="success"
              onClick={() => {
                if (!isPublished) {
                  publishExam();
                } else {
                  unpublishExam();
                }
              }}
              disabled={isPublishStateChanging}
            >
              {isPublishStateChanging
                ? "Loading..."
                : isPublished
                ? "Unpublish Exam"
                : "Publish Exam"}
            </Button>
            <Link to={programRoutes.indexParticipants(examId)}>
              <Button variant="primary" className="mx-2">
                participants
              </Button>
            </Link>
          </div>
          <div>
            <p className="text-muted small my-2">
              <BsExclamationTriangle />
              <span>
                {isPublished
                  ? "if you want to change the exam, you must unpublish it first. users can not register or participate in exam if it is unpublished"
                  : "You must publish your exam to allow other participate in your exam."}
              </span>
            </p>
          </div>
        </div>
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
              isVisible={addQuestionFormVisible}
              onDismiss={() => setAddQuestionFormVisible(false)}
              addQuestion={(questionObject) => {
                addQuestion(questionObject);
                setAddQuestionFormVisible(false);
              }}
            />
          </ElementContainer>
        ) : (
          <Button
            variant="success"
            className="w-100"
            onClick={() => setAddQuestionFormVisible(true)}
            disabled={isPublished}
          >
            Add Question
          </Button>
        )}
      </QuestionTypesProvider>
    </div>
  );
};

export default UpdateExamPage;
