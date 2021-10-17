import {
  screen,
  renderWithRouter,
} from "../../../../test-utils/testing-library-utils";
import programRoutes from "../../../../constants/program-routes.constant";
import App from "../../../../App";
import userEvent from "@testing-library/user-event";

test("created-exams route is not accessible without authentication", async () => {
  renderWithRouter(<App />, { route: programRoutes.indexCreatedExams });

  expect(window.location.pathname).toBe("/");

  const loginButton = screen.getByRole("button", { name: /login/i });
  userEvent.click(loginButton);

  const emailField = screen.getByRole("textbox", { name: /email/i });
  const passwordField = screen.getByPlaceholderText(/password/i);

  userEvent.clear(emailField);
  userEvent.clear(passwordField);

  userEvent.type(emailField, "fkub@example.org");
  userEvent.type(passwordField, "password");

  const submitButton = screen.getByRole("button", { name: "LOGIN" });
  userEvent.click(submitButton);

  const profileLink = await screen.findByRole("link", { name: /profile/i });
  userEvent.click(profileLink);

  expect(window.location.pathname).toBe("/profile");
});

test("participated-exams route is not accessible without authentication", async () => {
  renderWithRouter(<App />, { route: programRoutes.indexParticipatedExams });

  expect(window.location.pathname).toBe("/");

  const loginButton = screen.getByRole("button", { name: /login/i });
  userEvent.click(loginButton);

  const emailField = screen.getByRole("textbox", { name: /email/i });
  const passwordField = screen.getByPlaceholderText(/password/i);

  userEvent.clear(emailField);
  userEvent.clear(passwordField);

  userEvent.type(emailField, "fkub@example.org");
  userEvent.type(passwordField, "password");

  const submitButton = screen.getByRole("button", { name: "LOGIN" });
  userEvent.click(submitButton);

  const profileLink = await screen.findByRole("link", { name: /profile/i });
  userEvent.click(profileLink);

  expect(window.location.pathname).toBe("/profile");
});

test("create-exam route is not accessible without authentication", async () => {
  renderWithRouter(<App />, { route: programRoutes.createExam });

  expect(window.location.pathname).toBe("/");

  const loginButton = screen.getByRole("button", { name: /login/i });
  userEvent.click(loginButton);

  const emailField = screen.getByRole("textbox", { name: /email/i });
  const passwordField = screen.getByPlaceholderText(/password/i);

  userEvent.clear(emailField);
  userEvent.clear(passwordField);

  userEvent.type(emailField, "fkub@example.org");
  userEvent.type(passwordField, "password");

  const submitButton = screen.getByRole("button", { name: "LOGIN" });
  userEvent.click(submitButton);

  const profileLink = await screen.findByRole("link", { name: /profile/i });
  userEvent.click(profileLink);

  expect(window.location.pathname).toBe("/profile");
});
