import { ButtonGroup, ToggleButton } from "react-bootstrap";

const AnswerIndicator = ({
  answer,
  onChange,
  readOnly = false,
  suffix = "",
}) => {
  const handleChange = (e) => {
    if (!readOnly) {
      onChange(e.target.value === "1" ? true : false);
    }
  };
  return (
    <ButtonGroup>
      <ToggleButton
        id={`radio-correct-answer-${suffix}`}
        type="radio"
        variant="outline-success"
        name={`answer-indicator-${suffix}`}
        value={1}
        checked={answer}
        onChange={handleChange}
      >
        Correct Answer
      </ToggleButton>
      <ToggleButton
        id={`radio-wrong-answer-${suffix}`}
        type="radio"
        variant="outline-danger"
        name={`answer-indicator-${suffix}`}
        value={0}
        checked={!answer}
        onChange={handleChange}
      >
        Wrong Answer
      </ToggleButton>
    </ButtonGroup>
  );
};

export default AnswerIndicator;
