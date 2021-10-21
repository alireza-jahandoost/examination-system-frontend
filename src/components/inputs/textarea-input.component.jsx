import { Form } from "react-bootstrap";

const TextareaInput = ({ label, id, inputProps, ...props }) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control as="textarea" {...inputProps} />
    </Form.Group>
  );
};

export default TextareaInput;
