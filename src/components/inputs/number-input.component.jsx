import { Form } from "react-bootstrap";

const NumberInput = ({ label, id, inputProps, ...props }) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control type="number" {...inputProps} />
    </Form.Group>
  );
};

export default NumberInput;
