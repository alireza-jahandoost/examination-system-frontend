import { useState, useEffect, useContext } from "react";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";

import {
  questionsShowRequest,
  questionsUpdateRequest,
} from "../../services/questions/questions.service";

import EditDescriptive from "./edit-descriptive.component";
import EditFillTheBlank from "./edit-fill-the-blank.component";
import EditMultipleAnswers from "./edit-multiple-answers.component";
import EditSelectTheAnswer from "./edit-select-the-answer.component";
import EditTrueOrFalse from "./edit-true-or-false.component";
import EditOrdering from "./edit-ordering.component";

const EditQuestion = ({ examId, questionId }) => {
  const [question, setQuestion] = useState(null);
  const [errors, setErrors] = useState({});
  const { token } = useContext(AuthenticationContext);

  const addError = (newErrors) => {
    setErrors(newErrors);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    questionsShowRequest(examId, questionId, token)
      .then((response) => response.data.data)
      .then(({ question }) => {
        setQuestion(question);
      })
      .catch((err) => console.error(err));
  }, [questionId, examId, token]);

  const updateQuestion = (changedProperties) => {
    questionsUpdateRequest(examId, questionId, changedProperties, token)
      .then((response) => response.data.data)
      .then(({ question }) => setQuestion(question))
      .catch((err) => console.error(err));
  };

  let questionForm;

  switch (question?.question_type.question_type_name) {
    case undefined:
      questionForm = <p>Loading...</p>;
      break;
    case "descriptive":
      questionForm = (
        <EditDescriptive
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    case "fill the blank":
      questionForm = (
        <EditFillTheBlank
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    case "multiple answers":
      questionForm = (
        <EditMultipleAnswers
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    case "select the answer":
      questionForm = (
        <EditSelectTheAnswer
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    case "true or false":
      questionForm = (
        <EditTrueOrFalse
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    case "ordering":
      questionForm = (
        <EditOrdering
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    default:
      throw new Error("invalid question type id");
  }

  return (
    <div>
      {question && (
        <h3>
          <span> Question Type: </span>
          <span> {question.question_type.question_type_name} </span>
        </h3>
      )}
      {questionForm}
    </div>
  );
};

export default EditQuestion;
