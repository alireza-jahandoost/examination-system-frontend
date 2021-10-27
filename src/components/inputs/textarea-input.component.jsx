import { Form } from "react-bootstrap";

const TextareaInput = ({
  error,
  label,
  value,
  id,
  placeholder,
  onChange,
  rows = 3,
  readOnly = false,
  ...props
}) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control
        readOnly={readOnly}
        as="textarea"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        style={{ resize: "none" }}
      />
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default TextareaInput;
