import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseTo401 } from "../../../utilities/tests.utility";
import { questionsShowId_1 } from "../../../mocks/mocks/questions.mock";

import { QuestionGradeProvider } from "../question-grade.context";

import QuestionGrade from "../../../components/question-grade/question-grade.component";

import apiRoutes from "../../../constants/api-routes.constant";
import programRoutes from "../../../constants/program-routes.constant";
import { asignExamShowStartAndEnd } from "../../../utilities/tests.utility";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check participants.getGradeOfQuestion route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.getGradeOfQuestion(
        ":participantId",
        ":questionId"
      ),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <QuestionGradeProvider
        participantId={1}
        questionId={1}
        participantStatus="FINISHED"
      />,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check participants.saveScoreOfQuestion route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.saveScoreOfQuestion(
        ":questionId",
        ":participantId"
      ),
      method: "post",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <QuestionGradeProvider
        participantId={1}
        questionId={1}
        participantStatus="FINISHED"
      >
        <QuestionGrade canUserChangeGrade={true} questionId={1} />
      </QuestionGradeProvider>,
      {
        authenticationProviderProps: { removeUserInfo },
      }
    );

    const changeGradeInput = await screen.findByRole("spinbutton", {
      name: /grade/i,
    });
    userEvent.clear(changeGradeInput);
    userEvent.type(
      changeGradeInput,
      questionsShowId_1.data.question.question_score.toString()
    );

    const updateButton = screen.getByRole("button", { name: /update/i });
    userEvent.click(updateButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
