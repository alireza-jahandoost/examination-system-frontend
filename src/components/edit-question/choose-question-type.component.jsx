import { useContext, useState } from "react";
import { EditQuestionContext } from "../../contexts/edit-question-context/edit-question.context";

import EditDescriptive from "./edit-descriptive.component";
import EditFillTheBlank from "./edit-fill-the-blank.component";
import EditMultipleAnswers from "./edit-multiple-answers.component";
import EditSelectTheAnswer from "./edit-select-the-answer.component";
import EditTrueOrFalse from "./edit-true-or-false.component";
import EditOrdering from "./edit-ordering.component";

import DeleteButton from "../question-form-partials/delete-button.component";
import Modal from "../modal/modal.component";

const ChooseQuestionType = ({ onDeleteQuestion, readOnly = false }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const {
    question,
    errors,
    updateQuestion,
    addError,
    states,
    isLoading,
    deleteQuestion,
  } = useContext(EditQuestionContext);

  let questionForm;

  switch (question?.question_type.question_type_name) {
    case "descriptive":
      questionForm = (
        <EditDescriptive
          readOnly={readOnly}
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
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "multiple answer":
      questionForm = (
        <EditMultipleAnswers
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "select the answer":
      questionForm = (
        <EditSelectTheAnswer
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "true or false":
      questionForm = (
        <EditTrueOrFalse
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "ordering":
      questionForm = (
        <EditOrdering
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    default:
      questionForm = <p>Loading...</p>;
      break;
  }

  const handleDelete = () => {
    deleteQuestion();
    onDeleteQuestion();
  };

  return (
    <div>
      {question && (
        <div className="d-flex justify-content-between">
          <h3>
            <span> Question Type: </span>
            <span> {question.question_type.question_type_name} </span>
          </h3>
          <DeleteButton
            title="Delete Question"
            onClick={() => setIsModalShown(true)}
            disabled={readOnly}
          />
        </div>
      )}
      {isLoading ? <p> Loading... </p> : questionForm}
      <Modal
        onConfirm={handleDelete}
        isShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
        title="Delete Question"
        body="Are you sure you want to delete this question?"
      />
    </div>
  );
};

export default ChooseQuestionType;
