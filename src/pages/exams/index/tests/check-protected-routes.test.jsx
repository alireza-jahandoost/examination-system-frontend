import {
  screen,
  renderWithRouter,
  waitFor,
} from "../../../../test-utils/testing-library-utils";
import programRoutes from "../../../../constants/program-routes.constant";
import App from "../../../../App";
import userEvent from "@testing-library/user-event";
import {
  userEmail,
  correctPassword,
} from "../../../../mocks/mocks/authentication.mock";

test("created-exams route is not accessible without authentication", async () => {
  renderWithRouter(<App />, {
    route: programRoutes.indexCreatedExams(),
    withContexts: true,
  });

  await waitFor(() => expect(window.location.pathname).toBe("/"));

  const loginLink = screen.getByRole("link", { name: /login/i });
  userEvent.click(loginLink);

  const emailField = screen.getByRole("textbox", { name: /email/i });
  const passwordField = screen.getByPlaceholderText(/password/i);

  userEvent.clear(emailField);
  userEvent.clear(passwordField);

  userEvent.type(emailField, userEmail);
  userEvent.type(passwordField, correctPassword);

  const submitButton = screen.getByRole("button", { name: "LOGIN" });
  userEvent.click(submitButton);

  const profileLink = await screen.findByRole("link", { name: /profile/i });
  userEvent.click(profileLink);

  const createdExams = screen.getAllByRole("link", {
    name: /created exams/i,
  })[0];
  expect(createdExams).toBeEnabled();
  userEvent.click(createdExams);

  expect(window.location.pathname).toBe(programRoutes.indexCreatedExams());
});

test("participated-exams route is not accessible without authentication", async () => {
  renderWithRouter(<App />, {
    route: programRoutes.indexParticipatedExams(),
    withContexts: true,
  });

  await waitFor(() => expect(window.location.pathname).toBe("/"));

  const loginLink = screen.getByRole("link", { name: /login/i });
  userEvent.click(loginLink);

  const emailField = screen.getByRole("textbox", { name: /email/i });
  const passwordField = screen.getByPlaceholderText(/password/i);

  userEvent.clear(emailField);
  userEvent.clear(passwordField);

  userEvent.type(emailField, userEmail);
  userEvent.type(passwordField, correctPassword);

  const submitButton = screen.getByRole("button", { name: "LOGIN" });
  userEvent.click(submitButton);

  const profileLink = await screen.findByRole("link", { name: /profile/i });
  userEvent.click(profileLink);

  const participatedExams = screen.getAllByRole("link", {
    name: /participated exams/i,
  })[0];
  expect(participatedExams).toBeEnabled();
  userEvent.click(participatedExams);

  expect(window.location.pathname).toBe(programRoutes.indexParticipatedExams());
});
