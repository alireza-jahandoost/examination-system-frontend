import { Form } from "react-bootstrap";

const TextInput = ({
  error,
  label,
  value,
  id,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control
        type="password"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default TextInput;
