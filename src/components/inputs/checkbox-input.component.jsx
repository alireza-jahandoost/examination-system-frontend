import { Form } from "react-bootstrap";

const CheckboxInput = ({
  label,
  checked,
  id,
  inputProps,
  onChange,
  error,
  readOnly = false,
  ...props
}) => {
  return (
    <Form.Group controlId={id} {...props}>
      <Form.Check
        type="checkbox"
        readOnly={readOnly}
        checked={!!checked}
        {...inputProps}
        label={label}
        onChange={onChange}
      />
      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};

export default CheckboxInput;
