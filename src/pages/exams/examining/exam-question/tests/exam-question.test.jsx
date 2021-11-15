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

test.skip("user can answer multiple answers question", async () => {});

test.skip("user can answer select the answer question", async () => {});

test.skip("user can answer true or false question", async () => {});

test.skip("user can answer ordering question", async () => {});

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
