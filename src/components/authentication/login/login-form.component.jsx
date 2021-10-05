import { useState, useContext } from "react";
import { Form, Alert } from "react-bootstrap";
import TextInput from "../partials/text-input.component";
import AuthButton from "../partials/auth-button.component";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const LoginForm = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div {...props}>
      <div className="h-100 d-flex flex-column align-items-around justify-content-around">
        {errors.length > 0 && (
          <div>
            {errors.map((error, idx) => (
              <Alert variant="danger" key={`error-${idx}`}>
                {error}
              </Alert>
            ))}
          </div>
        )}
        <Form
          className="flex-fill d-flex flex-column justify-content-around align-items-around"
          onSubmit={handleSubmit}
        >
          <TextInput
            id="login-email-address"
            type="email"
            placeholder="Email Address"
            label="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            id="login-password"
            type="password"
            placeholder="Password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton variant="dark" text="LOGIN" />
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
