import { ButtonGroup, ToggleButton } from "react-bootstrap";

const AnswerIndicator = ({
  answer,
  onChange,
  readOnly = false,
  suffix = "",
  buttonLabels = ["Correct Answer", "Wrong Answer"],
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
        {buttonLabels[0]}
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
        {buttonLabels[1]}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default AnswerIndicator;
