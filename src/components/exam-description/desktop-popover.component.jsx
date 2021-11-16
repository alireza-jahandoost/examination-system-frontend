import { useContext } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import UserInfo from "../user-info/user-info.component";
import ExamTime from "../exam-time/exam-time.component";
import PasswordInput from "./password-input.component";
import { ExamInfoContext } from "../../contexts/exam-info-context/exam-info.context";
import ExamDescriptionLoading from "./exam-description-loading.component";
import RegisterToExamButton from "./register-to-exam-button.component";

const DesktopPopover = () => {
  const { exam, isUserRegisteredToExam, examTime } = useContext(
    ExamInfoContext
  );
  const isPasswordRequired = exam ? exam.has_password : false;

  if (!exam) {
    return <ExamDescriptionLoading />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <div
        className="bg-light p-0"
        style={{
          height: "45vw",
          width: "72vw",
        }}
      >
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: "url(./lg-bg-exam-description.png)",
            backgroundSize: "cover",
          }}
        >
          <Container className="h-100 py-3 px-4 d-flex justify-content-around flex-column">
            <Row>
              <Col xs={6}>
                <UserInfo imageSize={100} />
              </Col>
              <Col xs={6}></Col>
            </Row>
            <Row>
              <Col>
                <h3 className="text-success">{exam.exam_name}</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={7}>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  at efficitur ex, quis scelerisque sapien. Donec congue libero
                  ultrices nunc laoreet, venenatis elementum sem feugiat. Nam
                  nec dolor aliquam, rutrum turpis non, fringilla libero. Aenean
                  semper feugiat sem, sit amet tincidunt diam imperdiet sed.
                  Fusce eu tempor arcu, vel auctor orci quam.{" "}
                </p>
              </Col>
              <Col xs={1}></Col>
              <Col
                xs={4}
                className="d-flex align-items-center justify-content-end"
              >
                {isPasswordRequired && (
                  <ExamTime fontSize="2vw" color="light" examTime={examTime} />
                )}
              </Col>
            </Row>
            <Form as={Row}>
              <Col xs={5}>
                {isPasswordRequired ? (
                  <PasswordInput examId={exam.exam_id} />
                ) : (
                  <ExamTime
                    fontSize="2vw"
                    color="success"
                    examTime={examTime}
                  />
                )}
              </Col>
              <Col xs="4"></Col>
              <Col
                xs="3"
                className="d-flex align-items-center justify-content-center"
              >
                {isUserRegisteredToExam ? (
                  <p>Registered</p>
                ) : (
                  <RegisterToExamButton
                    variant="light"
                    className="w-75 py-3 text-success rounded-pill"
                  />
                )}
              </Col>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DesktopPopover;
