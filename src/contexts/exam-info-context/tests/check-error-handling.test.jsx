import {
  waitFor,
  waitForElementToBeRemoved,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseTo401 } from "../../../utilities/tests.utility";

import { ExamInfoProvider } from "../exam-info.context";
import { ExaminingProvider } from "../../examining-context/examining.context";

import ExamOverview from "../../../pages/exams/examining/exam-overview/exam-overview.page";

import apiRoutes from "../../../constants/api-routes.constant";
import programRoutes from "../../../constants/program-routes.constant";
import { asignExamShowStartAndEnd } from "../../../utilities/tests.utility";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check exams.showExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.showExam(":examId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(<ExamInfoProvider examId={1} />, {
      authenticationProviderProps: { removeUserInfo },
    });

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check exams.registerInExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.registerInExam(":examId"),
      method: "post",
      otherHandlers: [
        asignExamShowStartAndEnd(
          1,
          new Date(Date.now() - 5000),
          new Date(Date.now() + 3600 * 1000)
        ),
      ],
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <ExamInfoProvider examId={1}>
        <ExaminingProvider>
          <ExamOverview />
        </ExaminingProvider>
      </ExamInfoProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.examiningOverview(1),
      }
    );

    const registerButton = await screen.findByRole("button", {
      name: /register/i,
    });
    userEvent.click(registerButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
