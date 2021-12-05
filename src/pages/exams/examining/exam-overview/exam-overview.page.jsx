import { useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";
import { ExaminingContext } from "../../../../contexts/examining-context/examining.context";

import ExamTime from "../../../../components/exam-time/exam-time.component";
import ExamPassword from "../../../../components/exam-password/exam-password.component";

import programRoutes from "../../../../constants/program-routes.constant";

const ExamOverviewPage = () => {
  const {
    exam,
    examTime,
    isContextLoaded,
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
  const canUserGoToExam = !!participant && !isUserFinishedExam;

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
    <div style={{ minHeight: "100vh" }} className="d-flex text-center">
      <Container className="flex-grow-1 d-flex flex-column ">
        <div>
          <p className="display-3"> {exam.exam_name} </p>
          <p className="small text-muted"> by {exam.owner_name} </p>
        </div>
        <p className="lead"> {exam.exam_description} </p>
        {participant && participant.status !== "NOT_FINISHED" && (
          <p className="display-5 text-success">
            your grade: {participant.grade || "not calculated yet"}
          </p>
        )}
        <div className="mt-5">
          <ExamTime color="dark" examTime={examTime} />
          {isUserRegisteredToExam ? (
            canUserGoToExam ? (
              <Link to={programRoutes.examiningQuestion(examId, firstQuestion)}>
                <Button>go to exam</Button>
              </Link>
            ) : (
              <p>Registered</p>
            )
          ) : (
            canUserRegisterToExam && (
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
                <Button type="submit"> Register for Exam </Button>
              </Form>
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default ExamOverviewPage;
