import {
  screen,
  renderWithAuthentication,
  waitForElementToBeRemoved,
} from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import UpdateExam from "../update-exam.page";
import { wait } from "../../../../utilities/tests.utility";
import programRoutes from "../../../../constants/program-routes.constant";
import { wrapper } from "./partials";
import { questionsIndex } from "../../../../mocks/mocks/questions.mock";

const numberOfQuestions = questionsIndex.data.questions.length;

test("user will see all the created questions in update page", async () => {
  renderWithAuthentication(wrapper(<UpdateExam />), {
    route: programRoutes.updateExam(1),
  });
  await wait(300);

  expect(screen.getAllByText(/question type/i)).toHaveLength(numberOfQuestions);
});

test("user can change and update the question if it is not published", async () => {
  renderWithAuthentication(wrapper(<UpdateExam />), {
    route: programRoutes.updateExam(1),
  });
  await wait(300);

  const newValue = "new new new value";
  const firstQuestionTextInput = screen.getAllByRole("textbox", {
    name: /question text/i,
  })[0];
  userEvent.clear(firstQuestionTextInput);
  userEvent.type(firstQuestionTextInput, newValue);

  const saveChangesButton = screen.getByRole("button", {
    name: /save changes/i,
  });
  userEvent.click(saveChangesButton);
  await waitForElementToBeRemoved(() =>
    screen.queryByRole("button", { name: /save changes/i })
  );
});

test("user can not change the question if it is published", async () => {
  renderWithAuthentication(wrapper(<UpdateExam />), {
    route: programRoutes.updateExam(2),
  });
  await wait(300);

  const newValue = "new new new value";
  const firstQuestionTextInput = screen.getAllByRole("textbox", {
    name: /question text/i,
  })[0];
  userEvent.clear(firstQuestionTextInput);
  userEvent.type(firstQuestionTextInput, newValue);

  expect(firstQuestionTextInput).not.toHaveValue(newValue);
});
