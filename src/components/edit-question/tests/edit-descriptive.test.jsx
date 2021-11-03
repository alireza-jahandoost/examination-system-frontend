import {
  renderWithAuthentication,
  screen,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import EditQuestion from "../edit-question.component";
import {
  errors,
  values,
  wrapper,
  savedMessage,
  buttonMessage,
} from "./partials";

test("at the beginning, there is not any update button and there is 'all changes saved' phrase", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={1} />));

  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
});

test("user can change the question text and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={1} />));

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change question text
  const questionTextInput = await screen.findByRole("textbox", {
    name: /question text/i,
  });
  userEvent.clear(questionTextInput);
  userEvent.type(questionTextInput, values.newQuestionText);
  // end

  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();

  // click update button
  const updateButton = screen.getByRole("button", { name: buttonMessage });
  userEvent.click(updateButton);
  // end

  // check for update
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
  // end
});

test("user can change the question score and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={1} />));

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change question score
  const questionScoreInput = await screen.findByRole("spinbutton", {
    name: /question score/i,
  });
  userEvent.clear(questionScoreInput);
  userEvent.type(questionScoreInput, values.newQuestionScore);
  // end

  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();

  // click update button
  const updateButton = screen.getByRole("button", { name: buttonMessage });
  userEvent.click(updateButton);
  // end

  // check for update
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
  // end
});

test("if question text was empty, when user clicks the update button, an error will be shown", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={1} />));

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change question text
  const questionTextInput = await screen.findByRole("textbox", {
    name: /question text/i,
  });
  userEvent.clear(questionTextInput);
  userEvent.type(questionTextInput, "");
  // end

  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();

  // click update button
  const updateButton = screen.getByRole("button", { name: buttonMessage });
  userEvent.click(updateButton);
  // end

  // check error
  expect(
    await screen.findByText(errors.emptyQuestionText, { exact: false })
  ).toBeInTheDocument();
  // end

  // check update did not happened
  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: buttonMessage })
  ).toBeInTheDocument();
  // end
});

test("if question score was zero or negative, when user clicks the update button, an error will be shown", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={1} />));

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change question score
  const questionScoreInput = await screen.findByRole("spinbutton", {
    name: /question score/i,
  });
  userEvent.clear(questionScoreInput);
  userEvent.type(questionScoreInput, "-1");
  // end

  // click update button
  const updateButton = screen.getByRole("button", { name: buttonMessage });
  userEvent.click(updateButton);
  // end

  // check error
  expect(
    await screen.findByText(errors.zeroOrNegativeQuestionScore, {
      exact: false,
    })
  ).toBeInTheDocument();
  // end

  // check update did not happened
  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: buttonMessage })
  ).toBeInTheDocument();
  // end
});
