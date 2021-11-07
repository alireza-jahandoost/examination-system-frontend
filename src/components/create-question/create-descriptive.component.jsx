import { useState, useContext } from "react";
import { useMountedState } from "react-use";

import { Button, Form, Row, Col } from "react-bootstrap";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";

import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";

import apiRoutes from "../../constants/api-routes.constant";

import { questionsStoreRequest } from "../../services/questions/questions.service";

const CreateDescriptive = ({ examId, addQuestion, readOnly = false }) => {
  const [errors, setErrors] = useState({});
  const [questionText, setQuestionText] = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();

  const handleCreate = (e) => {
    e.preventDefault();

    const bodyOfrequest = {
      question_text: questionText,
      question_score: questionScore,
      question_type_id: 1,
    };

    questionsStoreRequest(examId, bodyOfrequest, token)
      .then((response) => response.data.data)
      .then(({ question }) => {
        if (isMounted()) {
          addQuestion({
            question_id: question.question_id,
            question_link: apiRoutes.questions.showQuestion(
              examId,
              question.question_id
            ),
          });
        }
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.errors,
          message: err.response.data.message,
        });
      });
  };

  return (
    <Form className="my-4" onSubmit={handleCreate}>
      {errors.message && <p className="text-danger"> *{errors.message} </p>}
      <Row>
        <Col>
          <QuestionText
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            suffix={`not-created-question`}
            error={errors.question_text}
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} xl={3}>
          <QuestionScore
            value={questionScore}
            error={errors.question_score}
            onChange={(e) => setQuestionScore(e.target.value)}
            suffix={`not-created-question`}
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button disabled={readOnly} variant="primary" type="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateDescriptive;
