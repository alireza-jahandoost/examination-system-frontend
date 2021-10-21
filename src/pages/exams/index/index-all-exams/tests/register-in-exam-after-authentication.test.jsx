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

describe("authenticated user can register to exam", () => {
  test("user can authenticate and then register to not started exam in desktop", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

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

    // check registration
    const registerToExamMessage = await screen.findByText(
      /^you registered in exam ".*" successfully$/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("user can authenticate and then register to not started exam in mobile", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000)
    );
    renderWithRouter(wrapWithWidth(<App />, 500), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

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

    // check registration
    const registerToExamMessage = await screen.findByText(
      /you registered in exam ".*" successfully/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("user can authenticate and then input the password and then register to the exam if his password was corrent in desktop", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "password");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check registration
    const registerToExamMessage = await screen.findByText(
      /you registered in exam ".*" successfully/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("user can authenticate and then input the password and then register to the exam if his password was corrent in mobile", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 500), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "password");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check registration
    const registerToExamMessage = await screen.findByText(
      /you registered in exam ".*" successfully/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("user can authenticate and then input the password and then he will receive an error if his password was incorrect in desktop", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with wrong password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "wrongPassword");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check error
    const errorMessage = await screen.findByText(
      /the password of exam is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();

    const nullRegisteredText = screen.queryByText(/registered/i);
    expect(nullRegisteredText).not.toBeInTheDocument();
    // end
  });
  test("user can authenticate and then input the password and then he will receive an error if his password was incorrect in mobile", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 500), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with wrong password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "wrongPassword");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check error
    const errorMessage = await screen.findByText(
      /the password of exam is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();

    const nullRegisteredText = screen.queryByText(/registered/i);
    expect(nullRegisteredText).not.toBeInTheDocument();
    // end
  });
  test("user can authenticate and then input the password wrong and then he can try again and register to exam in desktop", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with wrong password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "wrongPassword");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check error
    const errorMessage = await screen.findByText(
      /the password of exam is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();

    const nullRegisteredText = screen.queryByText(/registered/i);
    expect(nullRegisteredText).not.toBeInTheDocument();
    // end

    //register again with correct password
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "password");

    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check registration
    const registerToExamMessage = await screen.findByText(
      /you registered in exam ".*" successfully/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("user can authenticate and then input the password wrong and then he can try again and register to exam in mobile", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with wrong password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "wrongPassword");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check error
    const errorMessage = await screen.findByText(
      /the password of exam is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();

    const nullRegisteredText = screen.queryByText(/registered/i);
    expect(nullRegisteredText).not.toBeInTheDocument();
    // end

    //register again with correct password
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "password");

    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check registration
    const registerToExamMessage = await screen.findByText(
      /you registered in exam ".*" successfully/i
    );
    expect(registerToExamMessage).toBeInTheDocument();

    const registeredText = screen.getByText(/^registered$/i);
    expect(registeredText).toBeInTheDocument();
    // end
  });
  test("user wont see the errors of wrong password of exam after he reopen the exam description in desktop", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with wrong password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "wrongPassword");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check error
    const errorMessage = await screen.findByText(
      /the password of exam is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();

    const nullRegisteredText = screen.queryByText(/registered/i);
    expect(nullRegisteredText).not.toBeInTheDocument();
    // end

    // close exam description
    const closeButton = screen.getAllByRole("button", { name: /close/i })[0];
    userEvent.click(closeButton);
    // end

    // reopen exam description
    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // check removed error
    const nullErrorMessage = screen.queryByText(
      /the password of exam is not correct/i
    );
    expect(nullErrorMessage).not.toBeInTheDocument();
    // end
  });
  test("user wont see the errors of wrong password of exam after he reopen the exam description in mobile", async () => {
    asignExamShowStartAndEnd(
      4,
      new Date(Date.now() + 5000 * 60),
      new Date(Date.now() + 3600 * 1000),
      true
    );
    renderWithRouter(wrapWithWidth(<App />, 1300), { route: "/exams" });
    await wait(200);

    // click login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);
    // end

    // login to site
    const loginEmailField = screen.getByRole("textbox", { name: /email/i });
    const loginPasswordField = screen.getByLabelText(/password/i);

    userEvent.clear(loginEmailField);
    userEvent.clear(loginPasswordField);
    userEvent.type(loginEmailField, "fkub@example.org");
    userEvent.type(loginPasswordField, "password");

    const loginSubmitButton = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(loginSubmitButton);

    const loginMessage = await screen.findByText(/you logged in successfully/i);
    expect(loginMessage).toBeInTheDocument();
    // end

    // open exam description
    const moreDetailsButtons = await screen.findAllByText(/more details/i);
    const ElementmoreDetailsButton = moreDetailsButtons[3];

    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // register to exam description with wrong password
    const registerExamPasswordField = await screen.findByLabelText(
      /exam password/i
    );
    userEvent.clear(registerExamPasswordField);
    userEvent.type(registerExamPasswordField, "wrongPassword");

    const registerButton = screen.getByRole("button", {
      name: /register to exam/i,
    });
    expect(registerButton).toBeEnabled();
    userEvent.click(registerButton);
    // end

    // check error
    const errorMessage = await screen.findByText(
      /the password of exam is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();

    const nullRegisteredText = screen.queryByText(/registered/i);
    expect(nullRegisteredText).not.toBeInTheDocument();
    // end

    // close exam description
    const closeButton = screen.getAllByRole("button", { name: /close/i })[0];
    userEvent.click(closeButton);
    // end

    // reopen exam description
    userEvent.click(ElementmoreDetailsButton);
    await wait(100);
    // end

    // check removed error
    const nullErrorMessage = screen.queryByText(
      /the password of exam is not correct/i
    );
    expect(nullErrorMessage).not.toBeInTheDocument();
    // end
  });
});
