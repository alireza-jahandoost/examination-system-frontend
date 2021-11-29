import { useContext, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

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
    participant === null ||
    isUserFinishedExam
  ) {
    return <Redirect to={programRoutes.examiningOverview(examId)} />;
  }

  const handleClick = (disabled) => {
    if (disabled) {
      return { onClick: (e) => e.preventDefault() };
    }
    return {};
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-around border-bottom py-3">
        <ExamTime color="dark" examTime={examTime} />
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Finish Exam
        </Button>
      </div>
      <Container className="bg-light flex-grow-1 rounded p-4 my-5">
        <div style={{ minHeight: "400px" }} className="d-flex ">
          <AnswerQuestionProvider
            questionId={questionId}
            examId={examId}
            participantId={participant.participant_id}
          >
            <AnswerQuestion />
          </AnswerQuestionProvider>
        </div>
        <div className="d-flex justify-content-end">
          <Link
            {...handleClick(prevQuestion === -1)}
            className="me-3"
            to={programRoutes.examiningQuestion(examId, prevQuestion)}
          >
            <Button disabled={prevQuestion === -1}>Previous</Button>
          </Link>
          <Link
            {...handleClick(nextQuestion === -1)}
            to={programRoutes.examiningQuestion(examId, nextQuestion)}
          >
            <Button disabled={nextQuestion === -1}>Next</Button>
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
      </Container>
    </div>
  );
};

export default ExamQuestionPage;
