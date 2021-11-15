import {
  screen,
  waitFor,
  renderWithAuthentication,
} from "../../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ExamQuestionPage from "../exam-question.page";
import { wrapper } from "./partials";
import programRoutes from "../../../../../constants/program-routes.constant";
import {
  indexDescriptive,
  indexFillTheBlank,
  indexMultipleAnswers,
  indexSelectTheAnswer,
  indexTrueOrFalse,
  indexOrdering,
} from "../../../../../mocks/mocks/answers.mock";
import { randomString } from "../../../../../utilities/tests.utility";
import {
  statesIndexMultipleAnswer,
  statesIndexSelectTheAnswer,
  statesIndexOrdering,
} from "../../../../../mocks/mocks/states.mock";

describe("check isContextLoaded", () => {
  test("if isContextLoaded of examining context is false, loading message must be shown in the exam question page", () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      isContextLoaded: false,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 1),
    });

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });
});

describe("check button when saving", () => {
  test("check button will be disabled and labeled by loading when request is sending", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 1),
    });

    const textboxValue = randomString();
    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    userEvent.clear(textbox);
    userEvent.type(textbox, textboxValue);

    await waitFor(() => expect(textbox).toHaveValue(textboxValue));

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /loading\.\.\./i })
      ).toBeDisabled()
    );
  });
});

describe("check descriptive questions", () => {
  test("the answers must be exist when component loaded", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 1),
    });

    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    await waitFor(() =>
      expect(textbox).toHaveValue(indexDescriptive.data.answers[0].text_part)
    );
  });

  test("user can create answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 1),
    });

    const textboxValue = randomString();
    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    expect(textbox).toHaveValue("");

    userEvent.clear(textbox);
    userEvent.type(textbox, textboxValue);

    await waitFor(() => expect(textbox).toHaveValue(textboxValue));

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/all changes saved/i)).toBeInTheDocument()
    );
  });

  test("user can change answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 1),
    });

    const textboxValue = randomString();
    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    expect(textbox).not.toHaveValue("");

    userEvent.clear(textbox);
    userEvent.type(textbox, textboxValue);

    await waitFor(() => expect(textbox).toHaveValue(textboxValue));

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/all changes saved/i)).toBeInTheDocument()
    );
    expect(textbox).toHaveValue(textboxValue);
  });
});

describe("check fill the blank questions", () => {
  test("the answers of the question must be loaded when component loaded", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 2),
    });

    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    await waitFor(() =>
      expect(textbox).toHaveValue(indexFillTheBlank.data.answers[0].text_part)
    );
  });

  test("user can create answer if the question does not have any answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 2),
    });

    const textboxValue = randomString();
    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    expect(textbox).toHaveValue("");

    userEvent.clear(textbox);
    userEvent.type(textbox, textboxValue);

    await waitFor(() => expect(textbox).toHaveValue(textboxValue));

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/all changes saved/i)).toBeInTheDocument()
    );
  });

  test("user can change answer if the question has answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 2),
    });

    const textboxValue = randomString();
    const textbox = await screen.findByRole("textbox", {
      name: /answer of question/i,
    });
    expect(textbox).not.toHaveValue("");

    userEvent.clear(textbox);
    userEvent.type(textbox, textboxValue);

    await waitFor(() => expect(textbox).toHaveValue(textboxValue));

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/all changes saved/i)).toBeInTheDocument()
    );
  });
});

describe("check multiple answers questions", () => {
  test("if the question has answer, the answers must be loaded correctly", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 3),
    });

    const checkboxes = await screen.findAllByRole("checkbox");

    const answers = indexMultipleAnswers.data.answers.map((answer) =>
      Number(answer.integer_part)
    );
    const states = statesIndexMultipleAnswer.data.states;
    const checked = [],
      unchecked = [];
    for (let i = 0; i < states.length; i++) {
      if (answers.includes(Number(states[i].state_id))) {
        checked.push(i);
      } else {
        unchecked.push(i);
      }
    }

    for (const current of checked) {
      expect(checkboxes[current]).toBeChecked();
    }
    for (const current of unchecked) {
      expect(checkboxes[current]).not.toBeChecked();
    }
  });

  test("if the question has no answer, user can create answers", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 3),
    });

    const checkboxes = await screen.findAllByRole("checkbox");

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/all changes saved/i)).toBeInTheDocument()
    );

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    for (let i = 2; i < checkboxes.length; i++) {
      expect(checkboxes[i]).not.toBeChecked();
    }
  });

  test("if the question has answer, user can change the answers", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 3),
    });

    const checkboxes = await screen.findAllByRole("checkbox");

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/all changes saved/i)).toBeInTheDocument()
    );

    const checked = [],
      unchecked = [];
    const answers = indexMultipleAnswers.data.answers.map((answer) =>
      Number(answer.integer_part)
    );
    const states = statesIndexMultipleAnswer.data.states;
    if (answers.includes(Number(states[0].state_id))) {
      unchecked.push(0);
    } else {
      checked.push(0);
    }

    if (answers.includes(Number(states[1].state_id))) {
      unchecked.push(1);
    } else {
      checked.push(1);
    }

    for (let i = 2; i < states.length; i++) {
      if (answers.includes(Number(states[i].state_id))) {
        checked.push(i);
      } else {
        unchecked.push(i);
      }
    }

    for (const current of checked) {
      expect(checkboxes[current]).toBeChecked();
    }
    for (const current of unchecked) {
      expect(checkboxes[current]).not.toBeChecked();
    }
  });
});

describe("check select the answer questions", () => {
  test("if question has answer, the answer must be checked when component loaded", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 4),
    });

    const states = statesIndexSelectTheAnswer.data.states;
    const answer = Number(indexSelectTheAnswer.data.answers[0].integer_part);

    const checked = states.findIndex(
      (state) => Number(state.state_id) === answer
    );

    const radios = await screen.findAllByRole("radio");

    expect(radios[checked]).toBeChecked();
    for (let i = 0; i < radios.length; i++) {
      if (i === checked) continue;
      expect(radios[i]).not.toBeChecked();
    }
  });

  test("if question has no answer, user can create new answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 4),
    });

    const radios = await screen.findAllByRole("radio");
    for (const radio of radios) {
      expect(radio).not.toBeChecked();
    }

    userEvent.click(radios[1]);
    const checked = 1;

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    expect(radios[checked]).toBeChecked();
    for (let i = 0; i < radios.length; i++) {
      if (i === checked) continue;
      expect(radios[i]).not.toBeChecked();
    }
  });

  test("if question has answer, user can change the answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 4),
    });

    const radios = await screen.findAllByRole("radio");

    const states = statesIndexSelectTheAnswer.data.states;
    let checked;
    if (Number(states[0].integer_part) === 1) {
      userEvent.click(radios[1]);
      checked = 1;
    } else {
      userEvent.click(radios[0]);
      checked = 0;
    }

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    expect(radios[checked]).toBeChecked();
    for (let i = 0; i < radios.length; i++) {
      if (i === checked) continue;
      expect(radios[i]).not.toBeChecked();
    }
  });
});

describe("check true or false question", () => {
  test("if the question is not answered, none of the radios must be checked", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 5),
    });

    const radios = await screen.findAllByRole("radio");
    for (const radio of radios) {
      expect(radio).not.toBeChecked();
    }
  });
  test("if the question is answered, that radio must be checked", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 5),
    });

    const answer = Boolean(indexTrueOrFalse.data.answers[0].integer_part);

    const checked = answer ? 0 : 1;

    const radios = await screen.findAllByRole("radio");
    expect(radios[checked]).toBeChecked();
    expect(radios[1 - checked]).not.toBeChecked();
  });
  test("if the question is not answered, user can create an answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 5),
    });

    const radios = await screen.findAllByRole("radio");
    userEvent.click(radios[0]);

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
  });
  test("if the question is answered, user can change the answer", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 5),
    });

    const answer = Boolean(indexTrueOrFalse.data.answers[0].integer_part);

    const checked = answer ? 0 : 1;

    const radios = await screen.findAllByRole("radio");
    expect(radios[checked]).toBeChecked();
    expect(radios[1 - checked]).not.toBeChecked();

    userEvent.click(radios[1 - checked]);

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    expect(radios[checked]).not.toBeChecked();
    expect(radios[1 - checked]).toBeChecked();
  });
});

describe("check ordering questions", () => {
  test("if the question is not answered, user can change the order of states", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 1,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 6),
    });

    const upButtons = await screen.findAllByRole("button", { name: /up/i });
    const lastUpButton = upButtons[upButtons.length - 1];

    userEvent.click(lastUpButton);

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    expect(await screen.findByText(/all changes saved/i)).toBeInTheDocument();
  });
  test("if the question is answered, user can change the order of states", async () => {
    const { WrappedElement } = wrapper(<ExamQuestionPage />, {
      participantId: 2,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningQuestion(1, 6),
    });

    const upButtons = await screen.findAllByRole("button", { name: /up/i });
    const lastUpButton = upButtons[upButtons.length - 1];

    userEvent.click(lastUpButton);

    const saveButton = await screen.findByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveButton);

    expect(await screen.findByText(/all changes saved/i)).toBeInTheDocument();
  });
});

describe("check next question button", () => {
  test.skip("if nextQuestion is -1, the next question button must be disabled", async () => {});
  test.skip("if nextQuestion is not -1, the next question must be a link to the next question", async () => {});
});

describe("check prev question button", () => {
  test.skip("if prevQuestion is -1, the prev question button must be disabled", async () => {});
  test.skip("if prevQuestion is not -1, the prev question must be a link to the prev question", async () => {});
});

test.skip("the examTime must be shown in the page correctly", () => {});

test.skip("if user clicks on finish exam button, a popover must be shown and if user click again on the button, the finishExam func must be called", async () => {});
