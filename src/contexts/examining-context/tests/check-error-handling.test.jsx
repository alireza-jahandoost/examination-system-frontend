import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseTo401 } from "../../../utilities/tests.utility";

import { ExamInfoProvider } from "../../exam-info-context/exam-info.context";
import { ExaminingProvider } from "../examining.context";

import ExamQuestionPage from "../../../pages/exams/examining/exam-question/exam-question.page";

import apiRoutes from "../../../constants/api-routes.constant";
import programRoutes from "../../../constants/program-routes.constant";
import { asignExamShowStartAndEnd } from "../../../utilities/tests.utility";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check participants.finishExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.finishExam(":examId"),
      method: "put",
      otherHandlers: [
        asignExamShowStartAndEnd(
          2,
          new Date(Date.now() - 5000),
          new Date(Date.now() + 3600 * 1000)
        ),
      ],
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ExamInfoProvider examId={2}>
        <Route path={programRoutes.examiningQuestion(":examId", ":questionId")}>
          <ExaminingProvider>
            <ExamQuestionPage />
          </ExaminingProvider>
        </Route>
      </ExamInfoProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.examiningQuestion(2, 1),
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const finishExamButton = await screen.findByRole("button", {
      name: /finish/i,
    });
    userEvent.click(finishExamButton);

    const confirmButton = await screen.findByRole("button", { name: /yes/i });
    userEvent.click(confirmButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check questions.indexQuestions route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.questions.indexQuestions(":examId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ExamInfoProvider examId={2}>
        <ExaminingProvider />
      </ExamInfoProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check participants.currentParticipant route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.currentParticipant(":examId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ExamInfoProvider examId={2}>
        <ExaminingProvider />
      </ExamInfoProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
