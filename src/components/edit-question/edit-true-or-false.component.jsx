import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";
import AnswerIndicator from "../question-form-partials/answer-indicator.component";

import errorMessages from "../../constants/error-messages.constant";

const EditTrueOrFalse = ({
  question,
  errors,
  updateQuestion,
  addError,
  states,
  readOnly = false,
}) => {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [questionScore, setQuestionScore] = useState(question.question_score);
  const [answer, setAnswer] = useState(Number(states[0].integer_part));
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
    if (Number(answer) !== Number(states[0].integer_part)) {
      changedProperties.changedStates = [
        { id: states[0].id, integer_part: Number(answer) },
      ];
    }
    updateQuestion(changedProperties);
  };

  useEffect(() => {
    if (typeof states !== "object") {
      return;
    }
    if (
      questionText !== question.question_text ||
      Number(questionScore) !== Number(question.question_score) ||
      Number(states[0].integer_part) !== Number(answer)
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
    answer,
    states,
  ]);

  return (
    <Form onSubmit={handleSubmit}>
      {errors.message && <p className="text-danger"> *{errors.message} </p>}
      <QuestionText
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        suffix={`question-${question.question_id}`}
        error={errors.question_text}
        readOnly={readOnly}
      />
      <AnswerIndicator
        answer={answer}
        onChange={(e) => setAnswer(e ? 1 : 0)}
        suffix={`not-created-question`}
        buttonLabels={["true", "false"]}
        readOnly={readOnly}
      />
      <QuestionScore
        value={questionScore}
        error={errors.question_score}
        onChange={(e) => setQuestionScore(e.target.value)}
        suffix={`question-${question.question_id}`}
        readOnly={readOnly}
      />
      {hasChange ? (
        <Button disabled={readOnly} variant="primary" type="submit">
          save changes
        </Button>
      ) : (
        <p> all changes saved </p>
      )}
    </Form>
  );
};

export default EditTrueOrFalse;
