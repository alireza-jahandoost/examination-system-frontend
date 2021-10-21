import { Form } from "react-bootstrap";

const TextInput = ({ label, id, inputProps, ...props }) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control type="text" {...inputProps} />
    </Form.Group>
  );
};

export default TextInput;
