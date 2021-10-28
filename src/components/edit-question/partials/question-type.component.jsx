import { Form, Row } from "react-bootstrap";

const QuestionType = ({
  options, // array of objects with value and label props
  selectedValue, // the value of selected object
  onChange,
  disabled = false,
}) => {
  // TODO: unique the id of selects
  return (
    <Form.Group as={Row} controlId="question-type">
      <Form.Label> Question Type </Form.Label>
      <Form.Select
        defaultValue={selectedValue}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default QuestionType;
