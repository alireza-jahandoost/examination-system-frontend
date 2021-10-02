import { Form } from "react-bootstrap";

const TextInput = ({ type, label, placeholder, id, ...props }) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Control
        aria-label={label}
        type={type}
        {...props}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default TextInput;
