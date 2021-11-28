import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseTo401 } from "../../../utilities/tests.utility";

import { AnswerQuestionProvider } from "../answer-question.context";

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

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
