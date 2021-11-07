import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";

import errorMessages from "../../constants/error-messages.constant";

const EditDescriptive = ({
  question,
  errors,
  updateQuestion,
  addError,
  readOnly = false,
}) => {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [questionScore, setQuestionScore] = useState(question.question_score);
  const [hasChange, setHasChange] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (questionText === "") {
      addError({ question_text: errorMessages.questions.question_text.empty });
      return;
    }
    if (questionScore === "" || questionScore <= 0) {
      addError({
        question_score: errorMessages.questions.question_score.notPositive,
      });
      return;
    }

    const changedProperties = {};
    if (questionText !== question.question_text) {
      changedProperties.question_text = questionText;
    }
    if (questionScore !== question.question_score) {
      changedProperties.question_score = questionScore;
    }
    updateQuestion(changedProperties);
  };

  useEffect(() => {
    if (
      questionText !== question.question_text ||
      Number(questionScore) !== Number(question.question_score)
    ) {
      setHasChange(true);
    } else {
      setHasChange(false);
    }
  }, [
    questionText,
    questionScore,
    question.question_text,
    question.question_score,
  ]);

  return (
    <Form onSubmit={handleSubmit} className="my-4">
      {errors.message && <p className="text-danger"> *{errors.message} </p>}
      <Row>
        <Col>
          <QuestionText
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            suffix={`question-${question.question_id}`}
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
            suffix={`question-${question.question_id}`}
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {hasChange ? (
            <Button disabled={readOnly} variant="primary" type="submit">
              save changes
            </Button>
          ) : (
            <p> all changes saved </p>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default EditDescriptive;
