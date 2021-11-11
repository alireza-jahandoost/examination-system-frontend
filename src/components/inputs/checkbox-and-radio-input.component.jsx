import { Form } from "react-bootstrap";

const CheckboxAndRadioInput = ({
  label,
  checked,
  id,
  inputProps,
  onChange,
  error,
  type,
  readOnly = false,
  ...props
}) => {
  return (
    <Form.Group controlId={id} {...props}>
      <Form.Check
        type={type}
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

export default CheckboxAndRadioInput;
