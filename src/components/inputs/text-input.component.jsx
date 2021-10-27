import { Form } from "react-bootstrap";

const TextInput = ({
  error,
  label,
  value,
  id,
  placeholder,
  onChange,
  readOnly = false,
  ...props
}) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control
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
