import NumberInput from "../../inputs/number-input.component";

const QuestionScore = ({ value, error, onChange, readOnly = false }) => {
  // TODO: id must be unique
  return (
    <NumberInput
      error={error}
      label="Question Score"
      value={value}
      id="question-score"
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

export default QuestionScore;
