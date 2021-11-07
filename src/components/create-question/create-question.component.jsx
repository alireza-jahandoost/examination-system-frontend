import { useState, useContext } from "react";

import { QuestionTypesContext } from "../../contexts/question-types-context/question-types.context";

import QuestionType from "../question-form-partials/question-type.component";

import CreateDescriptive from "./create-descriptive.component";
import CreateFillTheBlank from "./create-fill-the-blank.component";
import CreateMultipleAnswers from "./create-multiple-answers.component";
import CreateSelectTheAnswer from "./create-select-the-answer.component";
import CreateTrueOrFalse from "./create-true-or-false.component";
import CreateOrdering from "./create-ordering.component";

const CreateQuestion = ({ examId, addQuestion, readOnly = false }) => {
  const [questionTypeId, setQuestionTypeId] = useState(1);
  const { questionTypes } = useContext(QuestionTypesContext);

  let questionForm = <p>Loading...</p>;

  switch (Number(questionTypeId)) {
    case 1:
      questionForm = (
        <CreateDescriptive
          examId={examId}
          addQuestion={addQuestion}
          readOnly={readOnly}
        />
      );
      break;
    case 2:
      questionForm = (
        <CreateFillTheBlank
          examId={examId}
          addQuestion={addQuestion}
          readOnly={readOnly}
        />
      );
      break;
    case 3:
      questionForm = (
        <CreateMultipleAnswers
          examId={examId}
          addQuestion={addQuestion}
          readOnly={readOnly}
        />
      );
      break;
    case 4:
      questionForm = (
        <CreateSelectTheAnswer
          examId={examId}
          addQuestion={addQuestion}
          readOnly={readOnly}
        />
      );
      break;
    case 5:
      questionForm = (
        <CreateTrueOrFalse
          examId={examId}
          addQuestion={addQuestion}
          readOnly={readOnly}
        />
      );
      break;
    case 6:
      questionForm = (
        <CreateOrdering
          examId={examId}
          addQuestion={addQuestion}
          readOnly={readOnly}
        />
      );
      break;
    default:
      throw new Error("invalid question type id");
  }

  return (
    <div>
      {questionTypes && questionTypes.length > 0 && (
        <QuestionType
          options={questionTypes.map((current) => {
            return {
              value: current.type_id,
              label: current.type_name,
            };
          })}
          selectedValue={questionTypeId}
          onChange={(e) => {
            setQuestionTypeId(e.target.value);
          }}
          suffix={`not-created-question`}
        />
      )}
      {questionForm}
    </div>
  );
};

export default CreateQuestion;
