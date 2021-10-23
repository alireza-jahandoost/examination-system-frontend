import { Form } from "react-bootstrap";

const NumberInput = ({ error, label, value, id, onChange, ...props }) => {
  return (
    <Form.Group {...props} controlId={id}>
      <Form.Label> {label} </Form.Label>
      <Form.Control type="number" value={value} onChange={onChange} />
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default NumberInput;
