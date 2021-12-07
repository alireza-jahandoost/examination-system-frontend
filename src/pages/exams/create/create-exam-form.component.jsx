import { useState, useContext } from "react";
import { Alert, Button, Row, Col, Form } from "react-bootstrap";
import { useMountedState } from "react-use";
import { useHistory } from "react-router-dom";

import TextInput from "../../../components/inputs/text-input.component";
import NumberInput from "../../../components/inputs/number-input.component";
import TextareaInput from "../../../components/inputs/textarea-input.component";
import CheckboxInput from "../../../components/inputs/checkbox-input.component";
import PasswordInput from "../../../components/inputs/password-input.component";

import programRoutes from "../../../constants/program-routes.constant";

import { examsStoreRequest } from "../../../services/exams/exams.service";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import { NotificationContext } from "../../../contexts/notification-context/notification.context";
import { convertToUTC } from "../../../utilities/dateAndTime.utility";

const CreateExamForm = ({ ...props }) => {
  const [needsPassword, setNeedsPassword] = useState(false);
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examStart, setExamStart] = useState("");
  const [examEnd, setExamEnd] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [examPassword, setExamPassword] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const { createNotification } = useContext(NotificationContext);
  const isMounted = useMountedState();
  const history = useHistory();

  const handleSubmit = (e) => {
    const bodyOfRequest = {
      exam_name: examName,
      exam_description: examDescription,
      start_of_exam: convertToUTC(examStart),
      end_of_exam: convertToUTC(examEnd),
      total_score: totalScore,
      needs_confirmation: needsConfirmation,
    };
    if (needsPassword && examPassword !== "") {
      bodyOfRequest.password = examPassword;
    }
    e.preventDefault();
    setIsLoading(true);
    examsStoreRequest(token, bodyOfRequest)
      .then((response) => response.data.data)
      .then(({ exam }) => {
        if (isMounted()) {
          createNotification(
            `exam "${exam.exam_name}" created successfully`,
            3000
          );
          setIsLoading(false);
          history.push(programRoutes.updateExam(exam.exam_id));
        }
      })
      .catch((err) => {
        if (isMounted()) {
          switch (Number(err?.response?.status)) {
            case 401:
              removeUserInfo();
              break;
            case 422:
              const { message, errors } = err.response.data;
              setErrors({ message, ...errors });
              break;
            default:
              setErrors({
                message: "something went wrong, please try again later",
              });
          }
          setIsLoading(false);
        }
      });
  };

  return (
    <div {...props}>
      <div className="shadow bg-light rounded p-3 m-4 border">
        <Form onSubmit={handleSubmit}>
          {errors.message && <Alert variant="danger">{errors.message}</Alert>}
          <Row className="mt-3">
            <Col md={6} xl={3}>
              <TextInput
                error={errors.exam_name}
                label="Exam Name"
                id="exam-name"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Exam Name"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <TextareaInput
                error={errors.exam_description}
                label="Exam Description"
                id="exam-description"
                value={examDescription}
                onChange={(e) => setExamDescription(e.target.value)}
                placeholder="Exam Description"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <TextInput
                error={errors.start_of_exam}
                label="Exam's Start"
                id="exams-start"
                placeholder="Exam's Start"
                value={examStart}
                onChange={(e) => setExamStart(e.target.value)}
              />
            </Col>
            <Col>
              <TextInput
                error={errors.end_of_exam}
                label="Exam's End"
                id="exams-end"
                placeholder="Exam's End"
                value={examEnd}
                onChange={(e) => setExamEnd(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6} xl={3}>
              <NumberInput
                error={errors.total_score}
                label="Total Score"
                id="total-score"
                placeholder="Total Score"
                value={totalScore}
                onChange={(e) => setTotalScore(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <CheckboxInput
                error={errors.needs_confirmation}
                label="Confirmation Required?"
                id="confirmation-required"
                checked={needsConfirmation}
                onChange={(e) => setNeedsConfirmation(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={6} xl={3}>
              <CheckboxInput
                error={errors.needs_password}
                checked={!!needsPassword}
                onChange={(e) => setNeedsPassword(e.target.checked)}
                label="Needs Password?"
                id="needs-password"
              />
            </Col>
            {needsPassword && (
              <Col xs={12} md={6} xl={4}>
                <PasswordInput
                  error={errors.password}
                  label="Password"
                  id="exam-password"
                  placeholder="Exam's Password"
                  value={examPassword}
                  onChange={(e) => setExamPassword(e.target.value)}
                />
              </Col>
            )}
          </Row>
          <Row className="mt-3">
            <Col>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Loading..." : "Create"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CreateExamForm;
