import { useState, useContext } from "react";
import { Form, Alert } from "react-bootstrap";
import TextInput from "./text-input.component";
import AuthButton from "./auth-button.component";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      {errors &&
        errors.map((error, idx) => (
          <Alert variant="danger" key={`error-${idx}`}>
            {error}
          </Alert>
        ))}
      <Form onSubmit={handleSubmit}>
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
        <AuthButton variant="primary" text="LOGIN" />
      </Form>
    </div>
  );
};

export default Login;
