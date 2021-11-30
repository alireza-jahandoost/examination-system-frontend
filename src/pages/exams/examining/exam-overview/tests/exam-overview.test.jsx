import {
  renderWithAuthentication,
  renderWithRouter,
  screen,
  waitFor,
} from "../../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ExamOverview from "../exam-overview.page";
import { wrapper } from "./partials";
import programRoutes from "../../../../../constants/program-routes.constant";
import { randomString } from "../../../../../utilities/tests.utility";

test("if isContextLoaded is equal to false, user must see the loading message", async () => {
  const showUserLoginPopover = jest.fn();
  const { WrappedElement } = wrapper(<ExamOverview />, {
    participantId: 1,
    isContextLoaded: false,
  });
  renderWithAuthentication(WrappedElement, {
    route: programRoutes.examiningOverview(1),
    authenticationProviderProps: {
      user: null,
      isUserAuthenticated: false,
      showUserLoginPopover,
    },
  });

  expect(await screen.findByText(/loading\.\.\./i)).toBeInTheDocument();
});

describe("check when user is not authenticated", () => {
  test("if exam is not finished, user can click on register and then authenticate", async () => {
    const showUserLoginPopover = jest.fn();
    const { WrappedElement } = wrapper(<ExamOverview />, {
      participantId: 0,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningOverview(1),
      authenticationProviderProps: {
        user: null,
        isUserAuthenticated: false,
        showUserLoginPopover,
      },
    });

    const registerToExamButton = await screen.findByRole("button", {
      name: /register for exam/i,
    });
    userEvent.click(registerToExamButton);

    await waitFor(() => expect(showUserLoginPopover).toHaveBeenCalledTimes(1));
  });
  test("even if exam is not finished, user can not see go to exam button", async () => {
    const showUserLoginPopover = jest.fn();
    const { WrappedElement } = wrapper(<ExamOverview />, {
      participantId: 0,
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningOverview(1),
      authenticationProviderProps: {
        user: null,
        isUserAuthenticated: false,
        showUserLoginPopover,
      },
    });

    expect(
      screen.queryByRole("button", { name: /go to exam/i })
    ).not.toBeInTheDocument();
  });
  test("if exam is finished, user can not see register button", async () => {
    const showUserLoginPopover = jest.fn();
    const { WrappedElement } = wrapper(<ExamOverview />, {
      participantId: 0,
      examTime: {
        isExamStarted: true,
        isExamFinished: true,
        examTimeDuration: { seconds: 0, minutes: 0, hours: 0, days: 0 },
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
      },
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningOverview(1),
      authenticationProviderProps: {
        user: null,
        isUserAuthenticated: false,
        showUserLoginPopover,
      },
    });

    expect(
      screen.queryByRole("button", { name: /register for exam/i })
    ).not.toBeInTheDocument();
  });
});
describe("check when user is authenticated", () => {
  describe("check when exam is not finished", () => {
    test("user must not see register for exam button", async () => {
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: 1,
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      expect(
        screen.queryByRole("button", { name: /register for exam/i })
      ).not.toBeInTheDocument();
    });
    test("if user registered and user is not finished the exam, user can click go to exam", async () => {
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: 1,
        firstQuestion: 6,
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      const goToExamButton = await screen.findByRole("button", {
        name: /go to exam/i,
      });
      userEvent.click(goToExamButton);

      await waitFor(() =>
        expect(
          window.location.href.endsWith(programRoutes.examiningQuestion(1, 6))
        )
      );
    });
    test("if user registered and user finished the exam, user can not go to the exam", async () => {
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: 1,
        firstQuestion: 6,
        isUserFinishedExam: true,
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      expect(
        screen.queryByRole("button", { name: /go to exam/i })
      ).not.toBeInTheDocument();
    });
    test("if user is not registered, user can regiter in exam without password", async () => {
      const registerToExam = jest.fn();
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: 0,
        firstQuestion: null,
        registerToExam,
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      const registerForExamButton = await screen.findByRole("button", {
        name: /register for exam/i,
      });
      userEvent.click(registerForExamButton);

      await waitFor(() => expect(registerToExam).toHaveBeenCalledTimes(1));
    });
    test("if user is not registered, user can regiter in exam with password", async () => {
      const registerToExam = jest.fn();
      const changeExamPassword = jest.fn();
      const { WrappedElement } = wrapper(<ExamOverview />, {
        examId: 5,
        participantId: 0,
        firstQuestion: null,
        registerToExam,
        changeExamPassword,
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(5),
      });

      const passwordField = await screen.findByLabelText(/password/i);
      userEvent.type(passwordField, "test");

      const registerForExamButton = await screen.findByRole("button", {
        name: /register for exam/i,
      });
      userEvent.click(registerForExamButton);

      await waitFor(() => expect(changeExamPassword).toHaveBeenCalledTimes(4));
      await waitFor(() => expect(registerToExam).toHaveBeenCalledTimes(1));
    });
    test("if there is error message about password, it must be shown", async () => {
      const registerToExam = jest.fn();
      const changeExamPassword = jest.fn();
      const errorMessage = randomString();
      const { WrappedElement } = wrapper(<ExamOverview />, {
        examId: 5,
        participantId: 0,
        firstQuestion: null,
        registerToExam,
        changeExamPassword,
        errors: { message: errorMessage },
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(5),
      });

      expect(await screen.findByText(errorMessage)).toHaveClass("text-danger");
    });
  });
  describe("check when exam is finished", () => {
    test("if user registered to exam, user must see 'your grade: ' with the grade", async () => {
      const registerToExam = jest.fn();
      const changeExamPassword = jest.fn();
      const { WrappedElement } = wrapper(<ExamOverview />, {
        examId: 5,
        participantId: 1,
        firstQuestion: null,
        registerToExam,
        changeExamPassword,
        isUserFinishedExam: true,
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(5),
      });

      expect(
        screen.queryByRole("button", { name: /register for exam/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /go to exam/i })
      ).not.toBeInTheDocument();
      expect(screen.getByText(`your grade: ${20}`)).toBeInTheDocument();
    });
  });
});
