import {
  screen,
  renderWithRouter,
} from "../../../../../test-utils/testing-library-utils";
import {
  asignExamShowStartAndEnd,
  wait,
} from "../../../../../utilities/tests.utility";
import App from "../../../../../App";
import userEvent from "@testing-library/user-event";
import {
  userEmail,
  userName,
  correctPassword,
} from "../../../../../mocks/mocks/authentication.mock";
import programRoutes from "../../../../../constants/program-routes.constant";

describe("unauthenticated user can register for exam if authenticate with opened popover", () => {
  test("unauthenticated user can try to register for exam, then see the login page, login and register for exam", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(<App />, {
      route: programRoutes.indexAllExams(),
      withContexts: true,
    });
    await wait(200);

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[0];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register for exam description without password
    const registerButton = await screen.findByRole("button", {
      name: /register for exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, userEmail);
    userEvent.type(loginPasswordField, correctPassword);

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    expect(loginSubmitButton).toBeEnabled();
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // try to register in exam again
    userEvent.click(registerButton);
    // end

    // check registration
    const registerToExamMessage = await screen.findByText(
      /^you registered in exam ".*" successfully$/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("unauthenticated user can try to register for exam, then see the login page, change it to register and register to site and then register for exam", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(<App />, {
      route: programRoutes.indexAllExams(),
      withContexts: true,
    });
    await wait(200);

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[0];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register for exam description without password
    const registerButton = await screen.findByRole("button", {
      name: /register for exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // go from login to register
    const registerBottomButton = screen.getByRole("button", {
      name: /sign up/i,
    });
    userEvent.click(registerBottomButton);
    // end

    // register to site
    const registerNameField = screen.getByRole("textbox", { name: /name/i });
    const registerEmailField = screen.getByRole("textbox", { name: /email/i });
    const registerPasswordField = screen.getAllByLabelText(/password/i)[0];
    const registerConfirmPasswordField = screen.getByLabelText(
      /confirm password/i
    );

    userEvent.clear(registerNameField);
    userEvent.clear(registerEmailField);
    userEvent.clear(registerPasswordField);
    userEvent.clear(registerConfirmPasswordField);

    userEvent.type(registerNameField, userName);
    userEvent.type(registerEmailField, userEmail);
    userEvent.type(registerPasswordField, correctPassword);
    userEvent.type(registerConfirmPasswordField, correctPassword);

    const registerSubmitButton = screen.getByRole("button", {
      name: "REGISTER",
    });
    userEvent.click(registerSubmitButton);

    const registerMessage = await screen.findByText(
      /^you registered successfully$/i
    );
    expect(registerMessage).toBeInTheDocument();
    // end

    // try to register in exam again
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check registration
    const registerToExamMessage = await screen.findByText(
      /^you registered in exam ".*" successfully$/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
});
