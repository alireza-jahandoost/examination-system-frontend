import {
  screen,
  renderWithRouter,
} from "../../../../../test-utils/testing-library-utils";
import {
  asignExamShowStartAndEnd,
  wrapWithWidth,
  wait,
} from "../../../../../utilities/tests.utility";
import App from "../../../../../App";
import userEvent from "@testing-library/user-event";

describe("unauthenticated user can register to exam if authenticate with opened popover", () => {
  test("unauthenticated user can try to register to exam, then see the login page, login and register to exam in desktop", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[0];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description without password
    const registerButton = await screen.findByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

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
  test("unauthenticated user can try to register to exam, then see the login page, login and register to exam in mobile", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(wrapWithWidth(<App />, 500), { route: "/exams" });
    await wait(200);

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[0];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description without password
    const registerButton = await screen.findByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

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
  test("unauthenticated user can try to register to exam, then see the login page, change it to register and register to site and then register to exam in desktop", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[0];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description without password
    const registerButton = await screen.findByRole("button", {
      name: /register to exam/i,
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

    userEvent.type(registerNameField, "test");
    userEvent.type(registerEmailField, "test@test.com");
    userEvent.type(registerPasswordField, "1stStrongPassword");
    userEvent.type(registerConfirmPasswordField, "1stStrongPassword");

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
  test("unauthenticated user can try to register to exam, then see the login page, change it to register and register to site and then register to exam in mobile", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(wrapWithWidth(<App />, 500), { route: "/exams" });
    await wait(200);

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[0];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description without password
    const registerButton = await screen.findByRole("button", {
      name: /register to exam/i,
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

    userEvent.type(registerNameField, "test");
    userEvent.type(registerEmailField, "test@test.com");
    userEvent.type(registerPasswordField, "1stStrongPassword");
    userEvent.type(registerConfirmPasswordField, "1stStrongPassword");

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
