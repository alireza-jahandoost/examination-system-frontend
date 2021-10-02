import { render, screen } from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Login from "../login.component";
import { AuthenticationProvider } from "../../../../contexts/authentication-context/authentication.context";

test("user can login with login component", async () => {
  render(<Login />);

  const examField = screen.getByRole("textbox", { name: /email address/i });
  const passwordField = screen.getByLabelText(/password/i);

  userEvent.clear(examField);
  userEvent.type(examField, "fkub@example.org");

  userEvent.clear(passwordField);
  userEvent.type(passwordField, "password");

  const loginButton = screen.getByRole("button", { name: /login/i });

  userEvent.click(loginButton);

  const textMessage = await screen.findByRole(
    "alert",
    /you logged in successfully/i
  );
  expect(textMessage).toHaveClass("alert-success");
  expect(textMessage).toBeInTheDocument();
});

test("user will see the errors if he/she's login was unsuccessful", async () => {
  render(<Login />);

  const examField = screen.getByRole("textbox", { name: /email address/i });
  const passwordField = screen.getByLabelText(/password/i);

  userEvent.clear(examField);
  userEvent.type(examField, "test@example.org");

  userEvent.clear(passwordField);
  userEvent.type(passwordField, "password");

  const loginButton = screen.getByRole("button", { name: /login/i });

  userEvent.click(loginButton);

  const textMessage = await screen.findByRole(
    "alert",
    /invalid email or password/i
  );
  expect(textMessage).toHaveClass("alert-danger");
});
