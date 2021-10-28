import TextareaInput from "../../inputs/textarea-input.component";

const QuestionText = ({ value, onChange, readOnly = false, error = "" }) => {
  // TODO: id must be unique
  return (
    <TextareaInput
      label="Question Text"
      error={error}
      value={value}
      id="question-text"
      placeholder="Text of the question"
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

export default QuestionText;
