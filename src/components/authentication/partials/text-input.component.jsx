import { Form } from "react-bootstrap";
import "./text-input.styles.css";

const TextInput = ({ type, label, placeholder, id, error, ...props }) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Control
        className="border-top-0 border-end-0 border-start-0 border-4 border-dark text-center fw-light"
        style={{ backgroundColor: "inherit", fontSize: "min(4vw,20px)" }}
        aria-label={label}
        type={type}
        {...props}
        placeholder={placeholder}
      />
      {error && <p>{error[0]}</p>}
    </Form.Group>
  );
};

export default TextInput;
