import { Form, Row } from "react-bootstrap";

const QuestionType = ({
  options, // array of objects with value and label props
  selectedValue, // the value of selected object
  onChange,
  disabled = false,
  suffix = "",
}) => {
  return (
    <Form.Group as={Row} controlId={`question-type-${suffix}`}>
      <Form.Label> Question Type </Form.Label>
      <Form.Select
        value={selectedValue}
        onChange={onChange}
        disabled={disabled}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  );
};

export default QuestionType;
