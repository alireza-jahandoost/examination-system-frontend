import { useEffect, useState, useContext, useMemo } from "react";
import { Alert, Button, Row, Col, Form } from "react-bootstrap";
import { useMountedState } from "react-use";

import TextInput from "../../../components/inputs/text-input.component";
import NumberInput from "../../../components/inputs/number-input.component";
import TextareaInput from "../../../components/inputs/textarea-input.component";
import CheckboxInput from "../../../components/inputs/checkbox-input.component";
import PasswordInput from "../../../components/inputs/password-input.component";

import {
  examsUpdateRequest,
  examsShowRequest,
} from "../../../services/exams/exams.service";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import { NotificationContext } from "../../../contexts/notification-context/notification.context";
import {
  convertToUTC,
  convertFromUTC,
} from "../../../utilities/dateAndTime.utility";

const UpdateExamForm = ({ examId }) => {
  const [needsPassword, setNeedsPassword] = useState(false);
  const [exam, setExam] = useState(null);
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examStart, setExamStart] = useState("");
  const [examEnd, setExamEnd] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [examPassword, setExamPassword] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPublished, setIsPublished] = useState(false);
  const [isAnyChangeExist, setIsAnyChangeExist] = useState(false);
  const { token } = useContext(AuthenticationContext);
  const { createNotification } = useContext(NotificationContext);
  const isMounted = useMountedState();

  useEffect(() => {
    if (!exam) {
      return;
    }
    if (
      examName !== exam.exam_name ||
      examDescription !== exam.exam_description ||
      totalScore !== exam.total_score ||
      examPassword !== "" ||
      needsConfirmation !== exam.needs_confirmation ||
      examStart !== convertFromUTC(exam.start_of_exam) ||
      examEnd !== convertFromUTC(exam.end_of_exam)
    ) {
      setIsAnyChangeExist(true);
    } else {
      setIsAnyChangeExist(false);
    }
  }, [
    examName,
    examDescription,
    examStart,
    examEnd,
    totalScore,
    examPassword,
    needsConfirmation,
    exam,
  ]);

  useEffect(() => {
    if (!token) {
      return;
    }
    examsShowRequest(examId, token)
      .then((response) => response.data.data)
      .then((response) => {
        if (isMounted()) {
          setExam(response.exam);
          setExamName(response.exam.exam_name);
          setExamDescription(response.exam.exam_description);
          setExamStart(convertFromUTC(response.exam.start_of_exam));
          setExamEnd(convertFromUTC(response.exam.end_of_exam));
          setTotalScore(response.exam.total_score);
          setNeedsConfirmation(response.exam.needs_confirmation);
          setIsPublished(response.exam.published);
        }
      })
      .catch((err) => {
        setErrors({ message: "an error occured, please try again later" });
      });
  }, [examId, isMounted, token]);

  const handleSubmit = (e) => {
    const bodyOfRequest = {};
    if (exam.exam_name !== examName) {
      bodyOfRequest.exam_name = examName;
    }
    if (exam.exam_description !== examDescription) {
      bodyOfRequest.exam_description = examDescription;
    }
    if (exam.start_of_exam !== convertToUTC(examStart)) {
      bodyOfRequest.start_of_exam = convertToUTC(examStart);
    }
    if (exam.end_of_exam !== convertToUTC(examEnd)) {
      bodyOfRequest.end_of_exam = convertToUTC(examEnd);
    }
    if (exam.total_score !== totalScore) {
      bodyOfRequest.total_score = totalScore;
    }
    if (exam.needs_confirmation !== needsConfirmation) {
      bodyOfRequest.needs_confirmation = needsConfirmation;
    }
    bodyOfRequest.password = examPassword;
    e.preventDefault();
    setIsLoading(true);
    examsUpdateRequest(token, bodyOfRequest, examId)
      .then((response) => response.data.data)
      .then((response) => {
        if (isMounted()) {
          setIsLoading(false);
          setExamPassword("");
          setExam(response.exam);
          setExamStart(convertFromUTC(response.exam.start_of_exam));
          setExamEnd(convertFromUTC(response.exam.end_of_exam));
          setErrors({});
        }
      })
      .catch((err) => {
        if (isMounted()) {
          const { message, errors } = err.response.data;
          setErrors({ message, ...errors });
          setIsLoading(false);
        }
      });
  };

  if (!exam) {
    return <p>Loading...</p>;
  }
  return (
    <Form onSubmit={handleSubmit}>
      {errors.message && <Alert variant="danger">{errors.message}</Alert>}
      <Row className="mt-3">
        <Col md={6} xl={3}>
          <TextInput
            readOnly={isPublished}
            error={errors.exam_name}
            label="Exam Name"
            id="exam-name"
            value={examName}
            onChange={(e) => {
              setExamName(e.target.value);
            }}
            placeholder="Exam Name"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TextareaInput
            error={errors.exam_description}
            readOnly={isPublished}
            label="Exam Description"
            id="exam-description"
            value={examDescription}
            onChange={(e) => {
              setExamDescription(e.target.value);
            }}
            placeholder="Exam Description"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TextInput
            error={errors.start_of_exam}
            readOnly={isPublished}
            label="Exam's Start"
            id="exams-start"
            placeholder="Exam's Start"
            value={examStart}
            onChange={(e) => {
              setExamStart(e.target.value);
            }}
          />
        </Col>
        <Col>
          <TextInput
            error={errors.end_of_exam}
            readOnly={isPublished}
            label="Exam's End"
            id="exams-end"
            placeholder="Exam's End"
            value={examEnd}
            onChange={(e) => {
              setExamEnd(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} xl={3}>
          <NumberInput
            error={errors.total_score}
            readOnly={isPublished}
            label="Total Score"
            id="total-score"
            placeholder="Total Score"
            value={totalScore}
            onChange={(e) => {
              setTotalScore(Number(e.target.value));
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <CheckboxInput
            readOnly={isPublished}
            error={errors.needs_confirmation}
            label="Confirmation Required?"
            id="confirmation-required"
            checked={needsConfirmation}
            onChange={(e) => {
              setNeedsConfirmation(e.target.checked);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={6} xl={4}>
          <PasswordInput
            error={errors.password}
            label="Password"
            id="exam-password"
            placeholder="Exam's Password"
            value={examPassword}
            onChange={(e) => {
              setExamPassword(e.target.value);
            }}
          />
          <p className="text-muted small">
            {exam.has_password
              ? "* You already set the password, fill the above input to change it"
              : "* You have not set the password yet, fill the above input to set it"}
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {isAnyChangeExist ? (
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Save Changes"}
            </Button>
          ) : (
            <p>All Changes Saved</p>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateExamForm;
