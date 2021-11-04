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
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));

  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  await wait(100);
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
});

test("user can change text description and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
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
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
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

test("user can create an option and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // create new option
  const addOptionButton = screen.getByRole("button", { name: /new option/i });
  userEvent.click(addOptionButton);
  // end

  // change last option
  const optionInputs = screen.getAllByRole("textbox", {
    name: /question option/i,
  });
  const lastOptionInput = optionInputs[optionInputs.length - 1];
  userEvent.clear(lastOptionInput);
  userEvent.type(lastOptionInput, values.option1);
  // end

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

test("user can edit the text part of an option and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change last option
  const optionInputs = screen.getAllByRole("textbox", {
    name: /question option/i,
  });
  const lastOptionInput = optionInputs[optionInputs.length - 1];
  userEvent.clear(lastOptionInput);
  userEvent.type(lastOptionInput, values.newOption1);
  // end

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

test("user can edit the integer part of an option and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change last option answer
  const optionAnswers = screen.getAllByRole("radio");
  if (optionAnswers[0].checked) {
    userEvent.click(optionAnswers[1]);
  } else {
    userEvent.click(optionAnswers[0]);
  }
  // end

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

test("user can delete an option and update", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // delete last option
  const deleteButtons = screen.getAllByRole("button", {
    name: /delete option/i,
  });
  const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
  userEvent.click(lastDeleteButton);
  // end

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

test("user can create an option and remove it and then he must not see any update button", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // create new option
  const addOptionButton = screen.getByRole("button", { name: /new option/i });
  userEvent.click(addOptionButton);
  // end

  // delete last option
  const deleteButtons = screen.getAllByRole("button", {
    name: /delete option/i,
  });
  const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
  userEvent.click(lastDeleteButton);
  // end

  await wait(100);

  // check for update
  expect(await screen.findByText(savedMessage)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: buttonMessage })
  ).not.toBeInTheDocument();
  // end
});

test("question text must not be empty and user will see error", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
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
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
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

test("the text part of created option must not be empty", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // create new option
  const addOptionButton = screen.getByRole("button", { name: /new option/i });
  userEvent.click(addOptionButton);
  // end

  // change last option
  const optionInputs = screen.getAllByRole("textbox", {
    name: /question option/i,
  });
  const lastOptionInput = optionInputs[optionInputs.length - 1];
  userEvent.clear(lastOptionInput);
  userEvent.type(lastOptionInput, "");
  // end

  // click update button
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
  userEvent.click(updateButton);
  // end

  await wait(100);

  // check error
  expect(
    await screen.findByText(errors.optionFieldIsEmpty, {
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

test("the text part of a past option must not be empty", async () => {
  renderWithAuthentication(wrapper(<EditQuestion examId={1} questionId={3} />));
  await wait(100);

  expect(await screen.findByText(savedMessage)).toBeInTheDocument();

  // change last option
  const optionInputs = screen.getAllByRole("textbox", {
    name: /question option/i,
  });
  const lastOptionInput = optionInputs[optionInputs.length - 1];
  userEvent.clear(lastOptionInput);
  userEvent.type(lastOptionInput, "");
  // end

  // click update button
  const updateButton = await screen.findByRole("button", {
    name: buttonMessage,
  });
  userEvent.click(updateButton);
  // end

  await wait(100);

  // check error
  expect(
    await screen.findByText(errors.optionFieldIsEmpty, {
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
