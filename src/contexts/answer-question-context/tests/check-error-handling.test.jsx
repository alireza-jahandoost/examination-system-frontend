import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import {
  changeRequestResponseTo401,
  changeRequestResponseTo422,
  changeRequestResponseToSpecificStatus,
} from "../../../utilities/tests.utility";

import { AnswerQuestionProvider } from "../answer-question.context";
import { ErrorBoundaryProvider } from "../../../contexts/error-boundary-context/error-boundary.context";

import AnswerQuestion from "../../../components/answer-question/answer-question.component";

import apiRoutes from "../../../constants/api-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check questions.showQuestion route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.questions.showQuestion(":examId", ":questionId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1} />,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });

  test("check answers.createAnswer route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.answers.createAnswer(":questionId"),
      method: "post",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1}>
        <AnswerQuestion />
      </AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const textbox = screen.getByRole("textbox");

    userEvent.clear(textbox);
    userEvent.type(textbox, "something something");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });

  test("check answers.deleteAnswers route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.answers.deleteAnswers(":questionId"),
      method: "delete",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1}>
        <AnswerQuestion />
      </AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const textbox = screen.getByRole("textbox");

    userEvent.clear(textbox);
    userEvent.type(textbox, "something something");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });

  test("check answers.indexAnswers route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.answers.indexAnswers(":questionId", ":participantId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider
        examId={1}
        questionId={1}
        participantId={1}
      ></AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });

  test("check states.indexStates route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.states.indexStates(":examId", ":questionId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider
        examId={1}
        questionId={3}
        participantId={1}
      ></AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe("check 422 errors", () => {
  test("check answers.createAnswer route", async () => {
    const { message, errors } = changeRequestResponseTo422({
      route: apiRoutes.answers.createAnswer(":questionId"),
      method: "post",
      fields: ["text_part", "integer_part"],
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1}>
        <AnswerQuestion />
      </AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const textbox = screen.getByRole("textbox");

    userEvent.clear(textbox);
    userEvent.type(textbox, "something something");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    // check button changed to loading
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /loading/i })).toBeDisabled()
    );
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(message, { exact: false })).toBeInTheDocument()
    );
    for (const error in errors) {
      await waitFor(() =>
        expect(
          screen.getByText(errors[error], { exact: false })
        ).toBeInTheDocument()
      );
    }

    // check button changed to normal
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeEnabled()
    );
    // end
  });

  test("check answers.deleteAnswers route", async () => {
    const { message, errors } = changeRequestResponseTo422({
      route: apiRoutes.answers.deleteAnswers(":questionId"),
      method: "delete",
      fields: [],
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1}>
        <AnswerQuestion />
      </AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const textbox = screen.getByRole("textbox");

    userEvent.clear(textbox);
    userEvent.type(textbox, "something something");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    // check button changed to loading
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /loading/i })).toBeDisabled()
    );
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(message, { exact: false })).toBeInTheDocument()
    );
    for (const error in errors) {
      await waitFor(() =>
        expect(
          screen.getByText(errors[error], { exact: false })
        ).toBeInTheDocument()
      );
    }

    // check button changed to normal
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeEnabled()
    );
    // end
  });
});

describe("check other errors", () => {
  test("check questions.showQuestion route", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    changeRequestResponseToSpecificStatus({
      route: apiRoutes.questions.showQuestion(":examId", ":questionId"),
      method: "get",
      status: 403,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ErrorBoundaryProvider>
        <AnswerQuestionProvider examId={1} questionId={1} participantId={1} />
      </ErrorBoundaryProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(screen.getByText(403)).toBeInTheDocument());
  });

  test("check answers.createAnswer route", async () => {
    changeRequestResponseToSpecificStatus({
      route: apiRoutes.answers.createAnswer(":questionId"),
      method: "post",
      status: 403,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1}>
        <AnswerQuestion />
      </AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const textbox = screen.getByRole("textbox");

    userEvent.clear(textbox);
    userEvent.type(textbox, "something something");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    // check button changed to loading
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /loading/i })).toBeDisabled()
    );
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );

    // check button changed to normal
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeEnabled()
    );
    // end
  });

  test("check answers.deleteAnswers route", async () => {
    changeRequestResponseToSpecificStatus({
      route: apiRoutes.answers.deleteAnswers(":questionId"),
      method: "delete",
      status: 403,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <AnswerQuestionProvider examId={1} questionId={1} participantId={1}>
        <AnswerQuestion />
      </AnswerQuestionProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const textbox = screen.getByRole("textbox");

    userEvent.clear(textbox);
    userEvent.type(textbox, "something something");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    // check button changed to loading
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /loading/i })).toBeDisabled()
    );
    // end

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );

    // check button changed to normal
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeEnabled()
    );
    // end
  });

  test("check answers.indexAnswers route", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    changeRequestResponseToSpecificStatus({
      route: apiRoutes.answers.indexAnswers(":questionId", ":participantId"),
      method: "get",
      status: 403,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ErrorBoundaryProvider>
        {" "}
        <AnswerQuestionProvider
          examId={1}
          questionId={1}
          participantId={1}
        ></AnswerQuestionProvider>
      </ErrorBoundaryProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(screen.getByText(403)).toBeInTheDocument());
  });

  test("check states.indexStates route", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    changeRequestResponseToSpecificStatus({
      route: apiRoutes.states.indexStates(":examId", ":questionId"),
      method: "get",
      status: 403,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ErrorBoundaryProvider>
        <AnswerQuestionProvider
          examId={1}
          questionId={3}
          participantId={1}
        ></AnswerQuestionProvider>
      </ErrorBoundaryProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(screen.getByText(403)).toBeInTheDocument());
  });
});
