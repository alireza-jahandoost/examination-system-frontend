import { useEffect, useState, useContext } from "react";
import { Form, Alert } from "react-bootstrap";
import TextInput from "../partials/text-input.component";
import AuthButton from "../partials/auth-button.component";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const RegisterForm = ({ ...props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, errors, resetErrors } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password, confirmPassword);
  };

  useEffect(() => {
    return () => {
      resetErrors();
    };
  }, []);

  return (
    <div {...props}>
      <div className="h-100 d-flex flex-column align-items-around justify-content-around">
        {errors.length > 0 && (
          <div>
            {errors.message && <Alert variant="danger">{errors.message}</Alert>}
          </div>
        )}
        <Form
          className="flex-fill d-flex flex-column justify-content-around align-items-around"
          onSubmit={handleSubmit}
        >
          <TextInput
            error={errors.name}
            id="register-name"
            type="text"
            placeholder="Name"
            label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            error={errors.email}
            id="register-email-address"
            type="email"
            placeholder="Email Address"
            label="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            error={errors.password}
            id="register-password"
            type="password"
            placeholder="Password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            error={errors.password_confirmation}
            id="register-password-confirmation"
            type="password"
            placeholder="Confirm Password"
            label="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <AuthButton variant="dark" text="REGISTER" />
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
