import { useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";

import { AnswerQuestionContext } from "../../contexts/answer-question-context/answer-question.context";

import AnswerDescriptive from "./answer-descriptive.component";
import AnswerFillTheBlank from "./answer-fill-the-blank.component";
import AnswerMultipleAnswers from "./answer-multiple-answers.component";
import AnswerSelectTheAnswer from "./answer-select-the-answer.component";
import AnswerTrueOrFalse from "./answer-true-or-false.component";
import AnswerOrdering from "./answer-ordering.component";

import QuestionInfo from "./question-info.component";

const AnswerQuestion = ({ readOnly = false }) => {
  const {
    isContextLoaded,
    hasChange,
    question,
    updateAnswers,
    isLoading,
    errors,
  } = useContext(AnswerQuestionContext);

  if (!isContextLoaded) {
    return <p> Loading... </p>;
  }

  let form;
  switch (question.question_type.question_type_name) {
    case "descriptive":
      form = <AnswerDescriptive readOnly={readOnly} />;
      break;
    case "fill the blank":
      form = <AnswerFillTheBlank readOnly={readOnly} />;
      break;
    case "multiple answer":
      form = <AnswerMultipleAnswers readOnly={readOnly} />;
      break;
    case "select the answer":
      form = <AnswerSelectTheAnswer readOnly={readOnly} />;
      break;
    case "true or false":
      form = <AnswerTrueOrFalse readOnly={readOnly} />;
      break;
    case "ordering":
      form = <AnswerOrdering readOnly={readOnly} />;
      break;
    default:
  }

  const handleClick = () => {
    updateAnswers();
  };

  return (
    <div className="flex-grow-1">
      <Container className="h-100">
        {errors.message && <p className="text-danger">{errors.message}</p>}
        <Form className="h-100 d-flex flex-column justify-content-around">
          <QuestionInfo
            questionText={question.question_text}
            questionScore={question.question_score}
          />
          {form}
          {!readOnly &&
            (hasChange ? (
              <Button disabled={isLoading} onClick={handleClick}>
                {isLoading ? "Loading..." : "save changes"}
              </Button>
            ) : (
              <p> all changes saved </p>
            ))}
        </Form>
      </Container>
    </div>
  );
};

export default AnswerQuestion;
