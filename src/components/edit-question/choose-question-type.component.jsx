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
    isDeleting,
    isContextLoaded,
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
        />
      );
      break;
    default:
      questionForm = <p>Loading...</p>;
      break;
  }

  const handleDelete = async () => {
    if (await deleteQuestion()) {
      onDeleteQuestion();
    }
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
            title={isDeleting ? "Loading..." : "Delete Question"}
            onClick={() => setIsModalShown(true)}
            disabled={readOnly || isDeleting}
          />
        </div>
      )}
      {errors.text_part && <p className="text-danger">{errors.text_part}</p>}
      {errors.integer_part && (
        <p className="text-danger">{errors.integer_part}</p>
      )}
      {!isContextLoaded ? <p> Loading... </p> : questionForm}
      <Modal
        onConfirm={handleDelete}
        isShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
        title="Delete Question"
        body="Are you sure you want to delete this question?"
        buttonLabels={
          isDeleting ? ["Loading...", "Loading..."] : ["Confirm", "Cancel"]
        }
        disabled={isDeleting}
      />
    </div>
  );
};

export default ChooseQuestionType;
