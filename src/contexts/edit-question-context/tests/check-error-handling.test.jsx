import {
  waitFor,
  waitForElementToBeRemoved,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseTo401 } from "../../../utilities/tests.utility";

import { EditQuestionProvider } from "../edit-question.context";

import EditQuestion from "../../../components/edit-question/edit-question.component";

import apiRoutes from "../../../constants/api-routes.constant";
import { randomString } from "../../../utilities/tests.utility";
import {
  values,
  buttonMessage,
} from "../../../components/edit-question/tests/partials";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check states.indexStates route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.states.indexStates(":examId", ":questionId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={3} />,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check states.createState route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.states.createState(":examId", ":questionId"),
      method: "post",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={3}>
        <EditQuestion examId={1} questionId={3} />
      </EditQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    // create new option
    const addOptionButton = await screen.findByRole("button", {
      name: /new option/i,
    });
    userEvent.click(addOptionButton);
    // end

    // change last option
    const optionInputs = screen.getAllByRole("textbox", {
      name: /question option/i,
    });
    const lastOptionInput = optionInputs[optionInputs.length - 1];
    userEvent.clear(lastOptionInput);
    userEvent.type(lastOptionInput, values.option1);
    // end

    // click update button
    const updateButton = await screen.findByRole("button", {
      name: buttonMessage,
    });
    userEvent.click(updateButton);
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check states.updateState route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.states.updateState(":examId", ":questionId", ":stateId"),
      method: "put",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={3}>
        <EditQuestion examId={1} questionId={3} />
      </EditQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    // change last option
    const optionInputs = await screen.findAllByRole("textbox", {
      name: /question option/i,
    });
    const lastOptionInput = optionInputs[optionInputs.length - 1];
    userEvent.clear(lastOptionInput);
    userEvent.type(lastOptionInput, values.newOption1);
    // end

    // click update button
    const updateButton = await screen.findByRole("button", {
      name: buttonMessage,
    });
    userEvent.click(updateButton);
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check states.deleteState route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.states.deleteState(":examId", ":questionId", ":stateId"),
      method: "delete",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={3}>
        <EditQuestion examId={1} questionId={3} />
      </EditQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    // delete last option
    const deleteButtons = await screen.findAllByRole("button", {
      name: /delete option/i,
    });
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
    userEvent.click(lastDeleteButton);
    // end

    // click update button
    const updateButton = await screen.findByRole("button", {
      name: buttonMessage,
    });
    userEvent.click(updateButton);
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });

  test("check questions.showQuestion route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.questions.showQuestion(":examId", ":questionId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={1} />,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check questions.updateQuestion route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.questions.updateQuestion(":examId", ":questionId"),
      method: "put",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={3}>
        <EditQuestion examId={1} questionId={3} />
      </EditQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    // change question text
    const questionTextInput = await screen.findByRole("textbox", {
      name: /question text/i,
    });
    userEvent.clear(questionTextInput);
    userEvent.type(questionTextInput, randomString());
    // end

    // click update button
    const updateButton = await screen.findByRole("button", {
      name: buttonMessage,
    });
    userEvent.click(updateButton);
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check questions.deleteQuestion route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.questions.deleteQuestion(":examId", ":questionId"),
      method: "delete",
    });

    const removeUserInfo = jest.fn();
    const deleteQuestion = jest.fn();
    renderWithAuthentication(
      <EditQuestionProvider examId={1} questionId={3}>
        <EditQuestion
          examId={1}
          questionId={1}
          deleteQuestion={deleteQuestion}
        />
      </EditQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const deleteButton = screen.getByRole("button", {
      name: /delete question/i,
    });
    userEvent.click(deleteButton);

    const confirmButton = await screen.findByRole("button", {
      name: /confirm/i,
    });
    userEvent.click(confirmButton);

    await waitFor(() => expect(deleteQuestion).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
