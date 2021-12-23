import {
  renderWithAuthentication,
  screen,
  waitFor,
} from "../../../../../test-utils/testing-library-utils";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import ExamOverview from "../exam-overview.page";
import { wrapper } from "./partials";
import programRoutes from "../../../../../constants/program-routes.constant";
import { wait } from "../../../../../utilities/tests.utility";

test("first of all, a loading message must be shown", async () => {
  const { WrappedElement } = wrapper(<ExamOverview />, {});
  renderWithAuthentication(WrappedElement, {
    route: programRoutes.examiningOverview(1),
  });

  expect(await screen.findByText(/loading\.\.\./i)).toBeInTheDocument();
});

describe("check register button", () => {
  describe("check when exam is finished", () => {
    test("if user own the exam, it must not be shown", async () => {
      const start = moment(Date.now() - 5000 * 60).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const end = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: 1,
        exam: {
          startOfExam: start,
          endOfExam: end,
          published: true,
          isRegistered: false,
          ownerId: 1,
        },
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: /register/i })
      ).not.toBeInTheDocument();
    });
    test("if user does not own the exam, it must not be shown", async () => {
      const start = moment(Date.now() - 5000 * 60).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const end = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: 1,
        exam: {
          startOfExam: start,
          endOfExam: end,
          published: true,
          isRegistered: false,
          ownerId: 12,
        },
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: /register/i })
      ).not.toBeInTheDocument();
    });
  });
  describe("check when exam is not finished", () => {
    describe("check when user own the exam", () => {
      test("the button must not be shown", async () => {
        const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: 1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            published: true,
            isRegistered: false,
            ownerId: 1,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        expect(
          screen.queryByRole("button", { name: /register/i })
        ).not.toBeInTheDocument();
      });
    });
    describe("check when user does not own the exam", () => {
      test("if user registered in exam, it must not be shown", async () => {
        const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: 1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 12,
            published: true,
            isRegistered: true,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        expect(
          screen.queryByRole("button", { name: /register/i })
        ).not.toBeInTheDocument();
      });
      test("if user not registered in exam, it must be shown", async () => {
        const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: -1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 12,
            isRegistered: false,
            published: true,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        expect(
          screen.queryByRole("button", { name: /register/i })
        ).toBeInTheDocument();
      });
    });
  });
});
describe("check go to exam button", () => {
  describe("check when exam is finished", () => {
    test("if use own the exam, it must not be shown", async () => {
      const start = moment(Date.now() - 60 * 5000).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const end = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: -1,
        exam: {
          startOfExam: start,
          endOfExam: end,
          ownerId: 1,
          isRegistered: false,
          published: true,
        },
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: /go to exam/i })
      ).not.toBeInTheDocument();
    });
    test("if user does not own the exam, it must not be shown", async () => {
      const start = moment(Date.now() - 60 * 5000).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const end = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: -1,
        exam: {
          startOfExam: start,
          endOfExam: end,
          ownerId: 12,
          isRegistered: false,
          published: true,
        },
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: /go to exam/i })
      ).not.toBeInTheDocument();
    });
  });
  describe("check when exam is not finished", () => {
    describe("check when user own the exam", () => {
      test("if user own the exam, the go to exam button must not be shown", async () => {
        const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: -1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 1,
            isRegistered: false,
            published: true,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        expect(
          screen.queryByRole("button", { name: /go to exam/i })
        ).not.toBeInTheDocument();
      });
    });
    describe("check when user does not own the exam", () => {
      describe("check when user registered for exam", () => {
        test("user can see the button if he/she does not finished the exam", async () => {
          const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
          const end = moment(Date.now() + 60 * 5000).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const { WrappedElement } = wrapper(<ExamOverview />, {
            participantId: 4,
            exam: {
              startOfExam: start,
              endOfExam: end,
              ownerId: 12,
              isRegistered: true,
              published: true,
            },
          });
          renderWithAuthentication(WrappedElement, {
            route: programRoutes.examiningOverview(1),
          });

          await waitFor(() =>
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
          );
          expect(
            await screen.findByRole("button", { name: /go to exam/i })
          ).toBeInTheDocument();
        });
        test("user can not see the button if he/she finished the exam", async () => {
          const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
          const end = moment(Date.now() + 60 * 5000).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const { WrappedElement } = wrapper(<ExamOverview />, {
            participantId: 1,
            exam: {
              startOfExam: start,
              endOfExam: end,
              ownerId: 12,
              isRegistered: true,
              published: true,
            },
          });
          renderWithAuthentication(WrappedElement, {
            route: programRoutes.examiningOverview(1),
          });

          await waitFor(() =>
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
          );
          await wait(500);
          expect(
            screen.queryByRole("button", { name: /go to exam/i })
          ).not.toBeInTheDocument();
        });
      });
      describe("check when user does not registered for exam", () => {
        test("if user does not registered, user must not see the exam", async () => {
          const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
          const end = moment(Date.now() + 60 * 5000).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const { WrappedElement } = wrapper(<ExamOverview />, {
            participantId: -1,
            exam: {
              startOfExam: start,
              endOfExam: end,
              ownerId: 12,
              isRegistered: false,
              published: true,
            },
          });
          renderWithAuthentication(WrappedElement, {
            route: programRoutes.examiningOverview(1),
          });

          await waitFor(() =>
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
          );
          await wait(500);
          expect(
            screen.queryByRole("button", { name: /go to exam/i })
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
describe("check edit exam button", () => {
  describe("check when user own the exam", () => {
    describe("check when exam is published", () => {
      test("if exam is started, user must not see the button", async () => {
        const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: -1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 1,
            isRegistered: false,
            published: true,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        await wait(500);
        expect(
          screen.queryByRole("button", { name: /edit exam/i })
        ).not.toBeInTheDocument();
      });
      test("if exam is not started, user must see the button", async () => {
        const start = moment(Date.now() + 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: -1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 1,
            isRegistered: false,
            published: true,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        await wait(500);
        expect(
          screen.queryByRole("button", { name: /edit exam/i })
        ).toBeInTheDocument();
      });
    });
    describe("check when exam is not published", () => {
      test("if exam is started, user must see the button", async () => {
        const start = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: -1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 1,
            isRegistered: false,
            published: false,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        await wait(500);
        expect(
          screen.queryByRole("button", { name: /edit exam/i })
        ).toBeInTheDocument();
      });
      test("if exam is not started, user must see the button", async () => {
        const start = moment(Date.now() + 5000).format("YYYY-MM-DD HH:mm:ss");
        const end = moment(Date.now() + 60 * 5000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const { WrappedElement } = wrapper(<ExamOverview />, {
          participantId: -1,
          exam: {
            startOfExam: start,
            endOfExam: end,
            ownerId: 1,
            isRegistered: false,
            published: false,
          },
        });
        renderWithAuthentication(WrappedElement, {
          route: programRoutes.examiningOverview(1),
        });

        await waitFor(() =>
          expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        );
        await wait(500);
        expect(
          screen.queryByRole("button", { name: /edit exam/i })
        ).toBeInTheDocument();
      });
    });
  });
  describe("check when user does not own the exam", () => {
    test("user must not see the button", async () => {
      const start = moment(Date.now() + 5000).format("YYYY-MM-DD HH:mm:ss");
      const end = moment(Date.now() + 60 * 5000).format("YYYY-MM-DD HH:mm:ss");
      const { WrappedElement } = wrapper(<ExamOverview />, {
        participantId: -1,
        exam: {
          startOfExam: start,
          endOfExam: end,
          ownerId: 12,
          isRegistered: false,
          published: true,
        },
      });
      renderWithAuthentication(WrappedElement, {
        route: programRoutes.examiningOverview(1),
      });

      await waitFor(() =>
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      );
      await wait(500);
      expect(
        screen.queryByRole("button", { name: /edit exam/i })
      ).not.toBeInTheDocument();
    });
  });
});
describe("check participants button", () => {
  test("if user own the exam, user must see this button", async () => {
    const start = moment(Date.now() + 5000).format("YYYY-MM-DD HH:mm:ss");
    const end = moment(Date.now() + 60 * 5000).format("YYYY-MM-DD HH:mm:ss");
    const { WrappedElement } = wrapper(<ExamOverview />, {
      participantId: -1,
      exam: {
        startOfExam: start,
        endOfExam: end,
        ownerId: 1,
        isRegistered: false,
        published: true,
      },
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningOverview(1),
    });

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
    expect(
      await screen.findByRole("button", { name: /participants/i })
    ).toBeInTheDocument();
  });
  test("if user does not own the exam, user must not see this button", async () => {
    const start = moment(Date.now() + 5000).format("YYYY-MM-DD HH:mm:ss");
    const end = moment(Date.now() + 60 * 5000).format("YYYY-MM-DD HH:mm:ss");
    const { WrappedElement } = wrapper(<ExamOverview />, {
      participantId: -1,
      exam: {
        startOfExam: start,
        endOfExam: end,
        ownerId: 12,
        isRegistered: false,
        published: true,
      },
    });
    renderWithAuthentication(WrappedElement, {
      route: programRoutes.examiningOverview(1),
    });

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
    await wait(500);
    expect(
      screen.queryByRole("button", { name: /participants/i })
    ).not.toBeInTheDocument();
  });
});
