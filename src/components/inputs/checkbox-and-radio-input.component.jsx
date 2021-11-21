import { Form } from "react-bootstrap";

const CheckboxAndRadioInput = ({
  label,
  checked,
  id,
  inputProps,
  onChange,
  error,
  type,
  disabled = false,
  ...props
}) => {
  return (
    <Form.Group controlId={id} {...props}>
      <Form.Check
        type={type}
        disabled={disabled}
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
