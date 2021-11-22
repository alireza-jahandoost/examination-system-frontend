import {
  renderWithAuthentication,
  waitForElementToBeRemoved,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import QuestionGrade from "../question-grade.component";
import { QuestionGradeProvider } from "../../../contexts/question-grade-context/question-grade.context";
import { showGrade } from "../../../mocks/mocks/grades.mock";

test("first of all, a loading message must be shown to user", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider questionId={1} participantId={1}>
      <QuestionGrade />
    </QuestionGradeProvider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("user can see the participant's grade", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider questionId={1} participantId={1}>
      <QuestionGrade />
    </QuestionGradeProvider>
  );

  expect(
    await screen.findByText(showGrade(1, 1).data.grade.grade, { exact: false })
  ).toBeInTheDocument();
});

test("if canUserChangeGrade is true, user can fill the input, press button and then input must be cleared and the grade must be shown to user", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider questionId={1} participantId={1}>
      <QuestionGrade canUserChangeGrade={true} />
    </QuestionGradeProvider>
  );

  const gradeInput = await screen.findByRole("spinbutton", { name: /grade/i });
  userEvent.clear(gradeInput);
  const newGrade = "123";
  userEvent.type(gradeInput, newGrade);

  const submitButton = await screen.findByRole("button", {
    name: /update grade/i,
  });
  userEvent.click(submitButton);

  await waitFor(() => expect(gradeInput).toHaveValue(null));
  expect(screen.getByText(newGrade, { exact: false })).toBeInTheDocument();
});

test("if canUserChangeGrade is false, user must not see any input nor button", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider questionId={1} participantId={1}>
      <QuestionGrade />
    </QuestionGradeProvider>
  );

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
});
