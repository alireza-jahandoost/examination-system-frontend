import { useState } from "react";
import { Form } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "./text-input.styles.css";

const TextInput = ({ label, placeholder, id, error, ...props }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <Form.Group className="mb-3 d-flex position-relative" controlId={id}>
      <Form.Control
        className="authentication-inputs border-top-0 border-end-0 border-start-0 border-4 border-dark text-center fw-light"
        style={{ backgroundColor: "inherit", fontSize: "min(4vw,20px)" }}
        aria-label={label}
        type={isHidden ? "password" : "text"}
        {...props}
        placeholder={placeholder}
      />
      {isHidden ? (
        <button
          type="button"
          onClick={() => setIsHidden(false)}
          className="toggle-show-auth-btn fs-5 border-0 bg-white position-absolute right-0"
          title="show password"
        >
          <BsEye />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsHidden(true)}
          className="toggle-show-auth-btn fs-5 border-0 bg-white position-absolute right-0"
          title="hide password"
        >
          <BsEyeSlash />
        </button>
      )}
      {error && <p className="text-danger">{error[0]}</p>}
    </Form.Group>
  );
};

export default TextInput;
