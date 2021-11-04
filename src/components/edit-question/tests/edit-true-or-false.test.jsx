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
import { wait } from "../../../utilities/tests.utility";

test("at the beginning, there is not any update button and there is 'all changes saved' phrase", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={5} />));

  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  await wait(100);
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
});

test("user can change text description and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={5} />));
  await wait(100);

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
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
  userEvent.click(updateButton);
  // end

  await wait(100);

  // check for update
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
  // end
});

test("user can change question score and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={5} />));
  await wait(100);

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
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
  userEvent.click(updateButton);
  // end

  // check for update
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
  // end
});

test("user can change the answer of question and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={5} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change the answer of question
  const radioButtons = screen.getAllByRole("button");
  if (radioButtons[0].checked) {
    userEvent.click(radioButtons[1]);
  } else {
    userEvent.click(radioButtons[0]);
  }

  await wait(100);

  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();

  // click update button
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
  userEvent.click(updateButton);
  // end

  // check for update
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
  // end
});

test("question text must not be empty and user will see error", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={5} />));
  await wait(100);

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
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
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

test("question score must be a positive number and will cause an error", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={5} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change question score
  const questionScoreInput = await screen.findByRole("spinbutton", {
    name: /question score/i,
  });
  userEvent.clear(questionScoreInput);
  userEvent.type(questionScoreInput, "-1");
  // end

  expect(screen.queryByText(savedMessage)).not.toBeInTheDocument();

  // click update button
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
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
