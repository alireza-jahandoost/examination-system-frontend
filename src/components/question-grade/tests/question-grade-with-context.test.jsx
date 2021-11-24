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
import axios from "axios";

test("first of all, a loading message must be shown to user", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider
      participantStatus="FINISHED"
      questionId={1}
      participantId={1}
    >
      <QuestionGrade />
    </QuestionGradeProvider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("user can see the participant's grade", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider
      participantStatus="FINISHED"
      questionId={1}
      participantId={1}
    >
      <QuestionGrade />
    </QuestionGradeProvider>
  );

  expect(
    await screen.findByText(showGrade(1, 1).data.grade.grade, { exact: false })
  ).toBeInTheDocument();
});

test("if canUserChangeGrade is true, user must not see update grade button first of all", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider
      participantStatus="FINISHED"
      questionId={1}
      participantId={1}
    >
      <QuestionGrade canUserChangeGrade={true} />
    </QuestionGradeProvider>
  );

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("if canUserChangeGrade is true, user can fill the input, press button and then input must be cleared and the grade must be shown to user", async () => {
  renderWithAuthentication(
    <QuestionGradeProvider
      participantStatus="FINISHED"
      questionId={1}
      participantId={1}
    >
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
    <QuestionGradeProvider
      participantStatus="FINISHED"
      questionId={1}
      participantId={1}
    >
      <QuestionGrade />
    </QuestionGradeProvider>
  );

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
});

describe("check participant status", () => {
  test("if status is equal to NOT_FINISHED user can not see grade or changing grade part", async () => {
    renderWithAuthentication(
      <QuestionGradeProvider
        questionId={1}
        participantId={1}
        participantStatus="NOT_FINISHED"
      >
        <QuestionGrade canUserChangeGrade={true} />
      </QuestionGradeProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    expect(
      screen.queryByText(showGrade(1, 1).data.grade.grade, { exact: false })
    ).not.toBeInTheDocument();
  });

  test("if status is equal to IN_PROCESSING user can not see grade or changing grade part", async () => {
    renderWithAuthentication(
      <QuestionGradeProvider
        questionId={1}
        participantId={1}
        participantStatus="IN_PROCESSING"
      >
        <QuestionGrade canUserChangeGrade={true} />
      </QuestionGradeProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    expect(
      screen.queryByText(showGrade(1, 1).data.grade.grade, { exact: false })
    ).not.toBeInTheDocument();
  });

  test("if status is equal to WAIT_FOR_MANUAL_CORRECTING user can not see grade but can see the changing grade part", async () => {
    renderWithAuthentication(
      <QuestionGradeProvider
        questionId={1}
        participantId={1}
        participantStatus="WAIT_FOR_MANUAL_CORRECTING"
      >
        <QuestionGrade canUserChangeGrade={true} />
      </QuestionGradeProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(
      screen.queryByText(showGrade(1, 1).data.grade.grade, { exact: false })
    ).not.toBeInTheDocument();
  });

  test("if status is equal to FINISHED user can see the grade and changing grade part", async () => {
    renderWithAuthentication(
      <QuestionGradeProvider
        questionId={1}
        participantId={1}
        participantStatus="FINISHED"
      >
        <QuestionGrade canUserChangeGrade={true} />
      </QuestionGradeProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(
      screen.getByText(showGrade(1, 1).data.grade.grade, { exact: false })
    ).toBeInTheDocument();
  });

  describe("check get grade request", () => {
    test("if status is equal to NOT_FINISHED request must not be send", async () => {
      const getSpy = jest.spyOn(axios, "get");
      renderWithAuthentication(
        <QuestionGradeProvider
          questionId={1}
          participantId={1}
          participantStatus="NOT_FINISHED"
        >
          <QuestionGrade canUserChangeGrade={true} />
        </QuestionGradeProvider>
      );

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );

      expect(getSpy).toHaveBeenCalledTimes(0);
    });
    test("if status is equal to IS_PROCESSING request must not be send", async () => {
      const getSpy = jest.spyOn(axios, "get");
      renderWithAuthentication(
        <QuestionGradeProvider
          questionId={1}
          participantId={1}
          participantStatus="IS_PROCESSING"
        >
          <QuestionGrade canUserChangeGrade={true} />
        </QuestionGradeProvider>
      );

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );

      expect(getSpy).toHaveBeenCalledTimes(0);
    });
    test("if status is equal to WAIT_FOR_MANUAL_CORRECTING request must not be send", async () => {
      const getSpy = jest.spyOn(axios, "get");
      renderWithAuthentication(
        <QuestionGradeProvider
          questionId={1}
          participantId={1}
          participantStatus="WAIT_FOR_MANUAL_CORRECTING"
        >
          <QuestionGrade canUserChangeGrade={true} />
        </QuestionGradeProvider>
      );

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );

      expect(getSpy).toHaveBeenCalledTimes(0);
    });
    test("if status is equal to FINISHED request must be send", async () => {
      const getSpy = jest.spyOn(axios, "get");
      renderWithAuthentication(
        <QuestionGradeProvider
          questionId={1}
          participantId={1}
          participantStatus="FINISHED"
        >
          <QuestionGrade canUserChangeGrade={true} />
        </QuestionGradeProvider>
      );

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );

      expect(getSpy).toHaveBeenCalledTimes(1);
    });
  });
});
