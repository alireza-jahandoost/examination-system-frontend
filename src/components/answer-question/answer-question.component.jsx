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

const AnswerQuestion = () => {
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
      form = <AnswerDescriptive />;
      break;
    case "fill the blank":
      form = <AnswerFillTheBlank />;
      break;
    case "multiple answer":
      form = <AnswerMultipleAnswers />;
      break;
    case "select the answer":
      form = <AnswerSelectTheAnswer />;
      break;
    case "true or false":
      form = <AnswerTrueOrFalse />;
      break;
    case "ordering":
      form = <AnswerOrdering />;
      break;
    default:
  }

  const handleClick = () => {
    updateAnswers();
  };

  return (
    <div>
      <Container>
        {errors.message && <p className="text-danger">{errors.message}</p>}
        <Form>
          <QuestionInfo
            questionText={question.question_text}
            questionScore={question.question_score}
          />
          {form}
          {hasChange ? (
            <Button disabled={isLoading} onClick={handleClick}>
              {isLoading ? "Loading..." : "save changes"}
            </Button>
          ) : (
            <p> all changes saved </p>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default AnswerQuestion;
