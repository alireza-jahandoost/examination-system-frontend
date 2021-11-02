import { useState, useContext } from "react";

import { QuestionTypesContext } from "../../contexts/question-types-context/question-types.context";

import QuestionType from "../question-form-partials/question-type.component";

import CreateDescriptive from "./create-descriptive.component";
import CreateFillTheBlank from "./create-fill-the-blank.component";
import CreateMultipleAnswers from "./create-multiple-answers.component";
import CreateSelectTheAnswer from "./create-select-the-answer.component";
import CreateTrueOrFalse from "./create-true-or-false.component";

const CreateQuestion = ({ examId, addQuestion }) => {
  const [questionTypeId, setQuestionTypeId] = useState(1);
  const { questionTypes } = useContext(QuestionTypesContext);

  let questionForm = <p>Loading...</p>;

  switch (Number(questionTypeId)) {
    case 1:
      questionForm = (
        <CreateDescriptive examId={examId} addQuestion={addQuestion} />
      );
      break;
    case 2:
      questionForm = (
        <CreateFillTheBlank examId={examId} addQuestion={addQuestion} />
      );
      break;
    case 3:
      questionForm = (
        <CreateMultipleAnswers examId={examId} addQuestion={addQuestion} />
      );
      break;
    case 4:
      questionForm = (
        <CreateSelectTheAnswer examId={examId} addQuestion={addQuestion} />
      );
      break;
    case 5:
      questionForm = (
        <CreateTrueOrFalse examId={examId} addQuestion={addQuestion} />
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
