import { useContext } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";
import { ExaminingContext } from "../../../../contexts/examining-context/examining.context";

import ExamPassword from "../../../../components/exam-password/exam-password.component";

import programRoutes from "../../../../constants/program-routes.constant";

import { convertFromUTC } from "../../../../utilities/dateAndTime.utility";

import useExamStatus from "../../../../hooks/useExamStatus";

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
  } = useContext(ExaminingContext);
  const { isUserAuthenticated, showUserLoginPopover, user } = useContext(
    AuthenticationContext
  );
  const { examId } = useParams();

  const isUserOwnExam = exam && user && exam.owner_id === user.user_id;

  const [examStatus] = useExamStatus({
    examStart: exam?.start_of_exam,
    examEnd: exam?.end_of_exam,
    isPublished: isUserOwnExam ? exam?.published : true,
  });

  const canUserRegisterToExam =
    examTime.isExamFinished === false && !participant && !isUserOwnExam;
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

  const canUserEditExam =
    isUserOwnExam &&
    (exam?.published === false ? true : !examTime.isExamStarted);

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
          <Table>
            <tbody>
              <tr>
                <td>Exam Name</td>
                <td>{exam.exam_name}</td>
              </tr>
              <tr>
                <td>Owner of Exam</td>
                <td>{exam.owner_name}</td>
              </tr>
              <tr>
                <td>Exam Status</td>
                <td>{examStatus}</td>
              </tr>
              <tr>
                <td>Start of Exam</td>
                <td>{convertFromUTC(exam.start_of_exam)}</td>
              </tr>
              <tr>
                <td>End of Exam</td>
                <td>{convertFromUTC(exam.end_of_exam)}</td>
              </tr>
              <tr>
                <td>Total Score</td>
                <td>{exam.total_score}</td>
              </tr>
              <tr>
                <td>User Status</td>
                <td>
                  {!!participant ? (
                    <>
                      <span> Registered And </span>
                      <span>
                        {participant.status
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/([ ]\w)|(^\w)/g, (c) => c.toUpperCase())}
                      </span>
                    </>
                  ) : (
                    <span> Not Registered</span>
                  )}
                </td>
              </tr>
              {canUserSeeGrade && (
                <tr>
                  <td>Your Grade</td>
                  <td>{participant.grade}</td>
                </tr>
              )}
            </tbody>
          </Table>

          {canUserGoToExam && (
            <Link to={programRoutes.examiningQuestion(examId, firstQuestion)}>
              <Button className="m-2" variant="success">
                go to exam
              </Button>
            </Link>
          )}

          {canUserEditExam && (
            <Link to={programRoutes.updateExam(examId)}>
              <Button className="m-2" variant="warning">
                edit exam
              </Button>
            </Link>
          )}

          {isUserOwnExam && (
            <Link to={programRoutes.indexParticipants(examId)}>
              <Button className="m-2" variant="primary">
                participants
              </Button>
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
                className="m-2"
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
