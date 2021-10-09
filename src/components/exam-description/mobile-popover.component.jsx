import { useContext } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import UserInfo from "../user-info/user-info.component";
import ExamTime from "./exam-time.component";
import PasswordInput from "./password-input.component";
import { ExamInfoContext } from "../../contexts/exam-info-context/exam-info.context";
import ExamDescriptionLoading from "./exam-description-loading.component";
const MobilePopover = () => {
  const { canUserRegister, exam } = useContext(ExamInfoContext);
  const isPasswordRequired = exam ? exam.has_password : false;

  if (!exam) {
    return <ExamDescriptionLoading />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <div
        className="bg-light p-0"
        style={{
          height: "80vh",
          width: "80vw",
        }}
      >
        <div
          className="w-100 h-100 border-start border-success border-5"
          style={{
            backgroundImage: "url(./mobile-bg-exam-description.png)",
            backgroundSize: "cover",
          }}
        >
          <Container className="d-flex flex-column justify-content-around p-4 align-items-start h-100">
            <Row>
              <Col xs={12}>
                <UserInfo imageSize={100} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 style={{ fontSize: "3vw" }} className="text-success">
                  {exam.exam_name}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ fontSize: "2vw" }} className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  at efficitur ex, quis scelerisque sapien. Donec congue libero
                  ultrices nunc laoreet, venenatis elementum sem feugiat. Nam
                  nec dolor aliquam, rutrum turpis non, fringilla libero. Aenean
                  semper feugiat sem, sit amet tincidunt diam imperdiet sed.
                  Fusce eu tempor arcu, vel auctor orci quam.{" "}
                </p>
              </Col>
            </Row>
            <Form as={Row}>
              <Col xs={12}>
                {isPasswordRequired && <PasswordInput examId={exam.exam_id} />}
              </Col>
              <Col
                xs={6}
                className="d-flex justify-content-center align-items-center"
              >
                <Button
                  variant="success"
                  className="py-2 text-light rounded-pill"
                  type="submit"
                  disabled={!canUserRegister}
                  style={{ width: "25vw" }}
                >
                  Register
                </Button>
              </Col>
              <Col xs={6}>
                <ExamTime fontSize="2vw" color="success" />
              </Col>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MobilePopover;
