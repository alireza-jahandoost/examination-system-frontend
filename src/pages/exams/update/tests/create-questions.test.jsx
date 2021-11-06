import {
  screen,
  renderWithAuthentication,
  waitFor,
} from "../../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import UpdateExam from "../update-exam.page";
import { convertFromUTC } from "../../../../utilities/dateAndTime.utility";
import { wait } from "../../../../utilities/tests.utility";
import { examShowId_1, examShowId_2 } from "../../../../mocks/mocks/exams.mock";
import programRoutes from "../../../../constants/program-routes.constant";

test("if the exam is not published, user can add question", async () => {
  renderWithAuthentication(
    <Route path={programRoutes.updateExam(":examId")} component={UpdateExam} />,
    {
      route: programRoutes.updateExam(1),
    }
  );
  await wait(100);

  // click new question button
  const addQuestionButton = screen.getByRole("button", {
    name: /add question/i,
  });
  userEvent.click(addQuestionButton);
  // end

  // check button removed
  expect(
    screen.queryByRole("button", { name: /add question/i })
  ).not.toBeInTheDocument();
  // end

  // fill question text
  const questionTexts = screen.getAllByRole("textbox", {
    name: /question text/i,
  });
  const questionText = questionTexts[questionTexts.length - 1];
  const value = "new new new value";
  userEvent.clear(questionText);
  userEvent.type(questionText, value);
  // end

  // fill question score
  const questionScores = screen.getAllByRole("spinbutton", {
    name: /question score/i,
  });
  const questionScore = questionScores[questionScores.length - 1];
  const score = "20";
  userEvent.clear(questionScore);
  userEvent.type(questionScore, score);
  // end

  // click create button
  const createButtons = screen.getAllByRole("button", { name: /create/i });
  const createButton = createButtons[createButtons.length - 1];
  expect(createButton).toBeEnabled();
  userEvent.click(createButton);
  // end

  await wait(100);

  // check add question button
  expect(
    await screen.findByRole("button", { name: /add question/i })
  ).toBeInTheDocument();
  // end

  // check question created
  await waitFor(() =>
    expect(
      screen.getAllByRole("textbox", { name: /question text/i })
    ).toHaveLength(questionTexts.length)
  );
  // end
});

test.skip("if the exam is published, user can not add question", async () => {
  renderWithAuthentication(
    <Route path={programRoutes.updateExam(":examId")} component={UpdateExam} />,
    {
      route: programRoutes.updateExam(2),
    }
  );
  await wait(100);

  // check create button is disabled
  const addQuestionButton = screen.getByRole("button", {
    name: /add question/i,
  });
  expect(addQuestionButton).toBeDisabled();
  // end
});
