import { render, screen } from "../../../test-utils/testing-library-utils";
import ExamDescription from "../exam-description.component";
import {
  wrapWithWidth,
  wait,
  asignExamShowStartAndEnd,
} from "../../../utilities/tests.utility";
import { ExamInfoProvider } from "../../../contexts/exam-info-context/exam-info.context";

describe("test password field", () => {
  test("if exam requires password, password field must be shwon in Desktop", async () => {
    const Element = (
      <ExamInfoProvider examId={4}>
        {wrapWithWidth(<ExamDescription />, 1200)}
      </ExamInfoProvider>
    );
    render(Element);

    const passwordInput = await screen.findByLabelText(/exam password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("if exam doesn't require password, password field must be shwon in Desktop", async () => {
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 1200)}
      </ExamInfoProvider>
    );
    render(Element);

    await wait(200);

    const passwordInput = screen.queryByLabelText(/exam password/i);
    expect(passwordInput).not.toBeInTheDocument();
  });

  test("if exam requires password, password field must be shwon in Mobile", async () => {
    const Element = (
      <ExamInfoProvider examId={4}>
        {wrapWithWidth(<ExamDescription />, 800)}
      </ExamInfoProvider>
    );
    render(Element);

    const passwordInput = await screen.findByLabelText(/exam password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("if exam doesn't require password, password field must be shwon in Mobile", async () => {
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 800)}
      </ExamInfoProvider>
    );
    render(Element);

    await wait(200);

    const passwordInput = screen.queryByLabelText(/exam password/i);
    expect(passwordInput).not.toBeInTheDocument();
  });
});

describe("check countdown field on Desktop", () => {
  test("check countdown for started exams", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() - 5000),
      new Date(Date.now() + 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 1300)}
      </ExamInfoProvider>
    );
    render(Element);

    const examTime = await screen.findByText(/exam is running/i);
    expect(examTime).toBeInTheDocument();
  });
  test("check countdown for future exams", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000),
      new Date(Date.now() + 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 1300)}
      </ExamInfoProvider>
    );
    render(Element);

    const examTime = await screen.findByText(/until start/i);
    expect(examTime).toBeInTheDocument();
  });
  test("check countdown for past exams", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() - 3600 * 5000),
      new Date(Date.now() - 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 1300)}
      </ExamInfoProvider>
    );
    render(Element);

    const examTime = await screen.findByText(/exam is over/i);
    expect(examTime).toBeInTheDocument();
  });
});

describe("check countdown field on mobile", () => {
  test("check countdown for started exams", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() - 5000),
      new Date(Date.now() + 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 600)}
      </ExamInfoProvider>
    );
    render(Element);

    const examTime = await screen.findByText(/exam is running/i);
    expect(examTime).toBeInTheDocument();
  });
  test("check countdown for future exams", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 5000),
      new Date(Date.now() + 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 600)}
      </ExamInfoProvider>
    );
    render(Element);

    const examTime = await screen.findByText(/until start/i);
    expect(examTime).toBeInTheDocument();
  });
  test("check countdown for past exams", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() - 3600 * 5000),
      new Date(Date.now() - 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 600)}
      </ExamInfoProvider>
    );
    render(Element);

    const examTime = await screen.findByText(/exam is over/i);
    expect(examTime).toBeInTheDocument();
  });
});

describe("check that the register button", () => {
  test("check that the register button is disabled when the exam finished in Desktop", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() - 3600 * 5000),
      new Date(Date.now() - 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 1300)}
      </ExamInfoProvider>
    );
    render(Element);

    const registerButton = await screen.findByRole("button", {
      name: /register/i,
    });
    expect(registerButton).toBeDisabled();
  });
  test("check that the register button is disabled when the exam finished in Mobile", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() - 3600 * 5000),
      new Date(Date.now() - 3600 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 800)}
      </ExamInfoProvider>
    );
    render(Element);

    const registerButton = await screen.findByRole("button", {
      name: /register/i,
    });
    expect(registerButton).toBeDisabled();
  });
});

describe("check duration of exam for Desktop", () => {
  test("check duration works currectly", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 2000),
      new Date(Date.now() + 2000 + 94380 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 1300)}
      </ExamInfoProvider>
    );
    render(Element);

    const duration = await screen.findByText(/duration:/i);
    expect(duration).toHaveTextContent("1:02:13:00");
    expect(duration).toHaveAttribute(
      "title",
      "duration of exam: 1 day, 2 hours, 13 minutes"
    );
  });
});

describe("check duration of exam for Mobile", () => {
  test("check duration works currectly", async () => {
    asignExamShowStartAndEnd(
      1,
      new Date(Date.now() + 2000),
      new Date(Date.now() + 2000 + 94380 * 1000)
    );
    const Element = (
      <ExamInfoProvider examId={1}>
        {wrapWithWidth(<ExamDescription />, 800)}
      </ExamInfoProvider>
    );
    render(Element);

    const duration = await screen.findByText(/duration:/i);
    expect(duration).toHaveTextContent("1:02:13:00");
    expect(duration).toHaveAttribute(
      "title",
      "duration of exam: 1 day, 2 hours, 13 minutes"
    );
  });
});
