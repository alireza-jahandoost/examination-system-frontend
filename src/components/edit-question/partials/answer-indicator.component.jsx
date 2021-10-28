import { ButtonGroup, ToggleButton } from "react-bootstrap";

const AnswerIndicator = ({ answer, onChange, readOnly = false }) => {
  const handleChange = (e) => {
    if (!readOnly) {
      onChange(e.target.value === "1" ? true : false);
    }
  };
  // TODO:  id and name must be unique
  return (
    <ButtonGroup>
      <ToggleButton
        id={`radio-correct-answer`}
        type="radio"
        variant="outline-success"
        name="answer-indicator"
        value={1}
        checked={answer}
        onChange={handleChange}
      >
        Correct Answer
      </ToggleButton>
      <ToggleButton
        id={`radio-wrong-answer`}
        type="radio"
        variant="outline-danger"
        name="answer-indicator"
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
