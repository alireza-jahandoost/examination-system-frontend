import { Form } from "react-bootstrap";

const CheckboxInput = ({ label, id, inputProps, ...props }) => {
  return (
    <Form.Group controlId={id} {...props}>
      <Form.Check type="checkbox" {...inputProps} label={label} />
    </Form.Group>
  );
};

export default CheckboxInput;
