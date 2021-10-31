import TextareaInput from "../inputs/textarea-input.component";

const QuestionText = ({
  value,
  onChange,
  readOnly = false,
  error = "",
  suffix = "",
}) => {
  return (
    <TextareaInput
      label="Question Text"
      error={error}
      value={value}
      id={`question-text-${suffix}`}
      placeholder="Text of the question"
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

export default QuestionText;
