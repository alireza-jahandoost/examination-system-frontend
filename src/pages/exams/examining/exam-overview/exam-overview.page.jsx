import { useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";
import { ExaminingContext } from "../../../../contexts/examining-context/examining.context";

import ExamPassword from "../../../../components/exam-password/exam-password.component";

import programRoutes from "../../../../constants/program-routes.constant";

const ExamOverviewPage = () => {
  const {
    exam,
    examTime,
    isContextLoaded,
    isRegisteringLoading,
    participant,
    firstQuestion,
    isUserFinishedExam,
    registerToExam,
    examPassword,
    changeExamPassword,
    errors,
    isUserRegisteredToExam,
  } = useContext(ExaminingContext);
  const { isUserAuthenticated, showUserLoginPopover } = useContext(
    AuthenticationContext
  );
  const { examId } = useParams();

  const canUserRegisterToExam =
    examTime.isExamFinished === false && !participant;
  const canUserGoToExam =
    !!participant &&
    !isUserFinishedExam &&
    examTime.isExamStarted &&
    !examTime.isExamFinished &&
    firstQuestion !== null;

  const canUserSeeGrade =
    !!participant &&
    participant.status === "FINISHED" &&
    examTime.isExamFinished;
  const handleRegistration = (e) => {
    e.preventDefault();

    if (!isUserAuthenticated) {
      showUserLoginPopover();
    } else {
      registerToExam();
    }
  };

  if (!isContextLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ minHeight: "100vh" }} className="text-start d-flex">
      <Container className="flex-grow-1 m-5 d-flex flex-column">
        <Container className="bg-white p-3 border shadow rounded">
          <p className="display-5"> Exam Name: {exam.exam_name} </p>
          <p className="small text-muted"> By: {exam.owner_name} </p>
          <p className="lead">
            Exam Status:
            {examTime.isExamStarted
              ? examTime.isExamFinished
                ? " Finished"
                : " Running"
              : " Not Started"}
          </p>
          <p className="lead">
            User Status:
            {!!participant ? (
              <>
                <span> Registered</span>
                <span> {participant.status}</span>
              </>
            ) : (
              <span> Not Registered</span>
            )}
          </p>
          {canUserSeeGrade && (
            <p className="lead"> Your Grade: {participant.grade}</p>
          )}
          {canUserGoToExam && (
            <Link to={programRoutes.examiningQuestion(examId, firstQuestion)}>
              <Button variant="success">go to exam</Button>
            </Link>
          )}

          {canUserRegisterToExam && (
            <Form onSubmit={handleRegistration}>
              {errors.message && (
                <p className="text-danger">{errors.message}</p>
              )}
              {exam.has_password && (
                <ExamPassword
                  examPassword={examPassword}
                  changeExamPassword={changeExamPassword}
                  passwordErrorMessage={errors.password}
                  examId={examId}
                />
              )}
              <Button
                variant="success"
                disabled={isRegisteringLoading}
                type="submit"
              >
                {isRegisteringLoading ? "Loading..." : "Register for Exam"}
              </Button>
            </Form>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default ExamOverviewPage;
