import {
  screen,
  waitFor,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { wrapper } from "./partials";
import AnswerQuestion from "../answer-question.component";

describe("check saving feature", () => {
  test("if hasChange is true, the save button must be shown", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 1,
      hasChange: true,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.queryByText(/all changes saved/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
  });

  test("if user clicks on save changes, the updateAnswers must be called", () => {
    const { WrappedElement, value } = wrapper(<AnswerQuestion />, {
      questionTypeId: 1,
      hasChange: true,
    });
    renderWithAuthentication(WrappedElement);

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    expect(value.updateAnswers).toHaveBeenCalledTimes(1);
  });

  test("if isLoading is true, the button must be disabled and labeled with 'loading...'", async () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 1,
      hasChange: true,
      isLoading: true,
    });
    renderWithAuthentication(WrappedElement);

    const loadingButton = screen.getByRole("button", {
      name: /loading/i,
    });
    await waitFor(() => expect(loadingButton).toBeDisabled());
  });

  test("if hasChange is false, the save button must not be shown", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 1,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getByText(/all changes saved/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /save changes/i })
    ).not.toBeInTheDocument();
  });
});

describe("check descriptive", () => {
  test("descriptive component must be mounted", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 1,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

describe("check fill the blank", () => {
  test("fill the blank component must be mounted", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 2,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

describe("check multiple answers", () => {
  test("multiple answers component must be mounted", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 3,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
  });
});

describe("check select the answer", () => {
  test("multiple answers component must be mounted", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 4,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
  });
});

describe("check true or false", () => {
  test("multiple answers component must be mounted", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 5,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });
});

describe("check ordering", () => {
  test("multiple answers component must be mounted", () => {
    const { WrappedElement } = wrapper(<AnswerQuestion />, {
      questionTypeId: 6,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });
});

describe("check text of question", () => {
  test("the question text must be shown in the component", () => {
    const { WrappedElement, value } = wrapper(<AnswerQuestion />, {
      questionTypeId: 6,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(screen.getByText(value.question.question_text)).toBeInTheDocument();
  });

  test("the question score must be shown in the component", () => {
    const { WrappedElement, value } = wrapper(<AnswerQuestion />, {
      questionTypeId: 6,
      hasChange: false,
    });
    renderWithAuthentication(WrappedElement);

    expect(
      screen.getByText(value.question.question_score, { exact: false })
    ).toBeInTheDocument();
  });
});
