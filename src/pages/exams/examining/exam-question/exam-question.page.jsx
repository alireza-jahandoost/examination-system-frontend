import { useContext, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import { ExaminingContext } from "../../../../contexts/examining-context/examining.context";
import { AnswerQuestionProvider } from "../../../../contexts/answer-question-context/answer-question.context";

import AnswerQuestion from "../../../../components/answer-question/answer-question.component";
import ExamTime from "../../../../components/exam-time/exam-time.component";
import Modal from "../../../../components/modal/modal.component";

import programRoutes from "../../../../constants/program-routes.constant";

const ExamQuestionPage = () => {
  const {
    isContextLoaded,
    nextQuestion,
    prevQuestion,
    examTime,
    participant,
    finishExam,
    isUserFinishedExam,
  } = useContext(ExaminingContext);
  const { examId, questionId } = useParams();
  const [showModal, setShowModal] = useState(false);

  if (!isContextLoaded) {
    return <p> Loading... </p>;
  }

  if (
    !examTime.isExamStarted ||
    examTime.isExamFinished ||
    !participant ||
    isUserFinishedExam
  ) {
    return <Redirect to={programRoutes.examiningOverview(examId)} />;
  }

  return (
    <div>
      <div>
        <ExamTime color="dark" examTime={examTime} />
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Finish Exam
        </Button>
      </div>
      <div>
        <AnswerQuestionProvider questionId={questionId} examId={examId}>
          <AnswerQuestion />
        </AnswerQuestionProvider>
      </div>
      <div>
        <Link to={programRoutes.examiningQuestion(examId, nextQuestion)}>
          <Button disabled={nextQuestion === -1}>Next</Button>
        </Link>
        <Link to={programRoutes.examiningQuestion(examId, prevQuestion)}>
          <Button disabled={prevQuestion === -1}>Previous</Button>
        </Link>
      </div>
      <Modal
        buttonLabels={["Yes, Finish Exam", "Cancel"]}
        onConfirm={finishExam}
        isShown={showModal}
        closeModal={() => setShowModal(false)}
        title="Finish Exam"
        body="Are you sure you want to finish the exam? you can not answer the questions anymore."
      />
    </div>
  );
};

export default ExamQuestionPage;
