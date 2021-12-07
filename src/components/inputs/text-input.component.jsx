import { Form } from "react-bootstrap";

const TextInput = ({
  error,
  label,
  value,
  id,
  placeholder,
  onChange,
  hiddenLabel = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  ...props
}) => {
  const additionalAttributes = {};
  if (hiddenLabel) {
    additionalAttributes["aria-label"] = label;
  }
  if (required) {
    additionalAttributes["required"] = "required";
  }
  if (autoFocus) {
    additionalAttributes["autoFocus"] = "autoFocus";
  }
  return (
    <Form.Group {...props} controlId={id}>
      {hiddenLabel === false && <Form.Label> {label} </Form.Label>}
      <Form.Control
        {...additionalAttributes}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
      />
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default TextInput;
