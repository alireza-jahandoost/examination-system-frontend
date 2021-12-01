import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  changeRequestResponseTo401,
  changeRequestResponseTo422,
} from "../../../utilities/tests.utility";
import { examShowId_1 } from "../../../mocks/mocks/exams.mock";

import { UpdateExamProvider } from "../update-exam.context";

import UpdateExamPage from "../../../pages/exams/update/update-exam.page";

import apiRoutes from "../../../constants/api-routes.constant";
import programRoutes from "../../../constants/program-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check exams.showExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.showExam(":examId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider />
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check questions.indexQuestions route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.questions.indexQuestions(":examId"),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider />
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check exams.updateExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.updateExam(":examId"),
      method: "put",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider>
          <UpdateExamPage />
        </UpdateExamProvider>
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    const examNameField = await screen.findByRole("textbox", {
      name: /exam name/i,
    });
    userEvent.clear(examNameField);
    userEvent.type(examNameField, examShowId_1.data.exam.exam_name + "a");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check exams.publishExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.publishExam(":examId"),
      method: "put",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider>
          <UpdateExamPage />
        </UpdateExamProvider>
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    const publishButton = await screen.findByRole("button", {
      name: /publish/i,
    });
    userEvent.click(publishButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
  test("check exams.unpublishExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.unpublishExam(":examId"),
      method: "put",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider>
          <UpdateExamPage />
        </UpdateExamProvider>
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    const publishButton = await screen.findByRole("button", {
      name: /publish/i,
    });
    userEvent.click(publishButton);

    const unpublishButton = await screen.findByRole("button", {
      name: /unpublish/i,
    });
    userEvent.click(unpublishButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe("check 422 errors", () => {
  const fields = [
    "exam_name",
    "needs_confirmation",
    "password",
    "start_of_exam",
    "end_of_exam",
    "total_score",
  ];
  test("check exams.updateExam route", async () => {
    const { message, errors } = changeRequestResponseTo422({
      route: apiRoutes.exams.updateExam(":examId"),
      method: "put",
      fields,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider>
          <UpdateExamPage />
        </UpdateExamProvider>
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    const examNameField = await screen.findByRole("textbox", {
      name: /exam name/i,
    });
    userEvent.clear(examNameField);
    userEvent.type(examNameField, examShowId_1.data.exam.exam_name + "a");

    const saveChangesButton = screen.getByRole("button", {
      name: /save changes/i,
    });
    userEvent.click(saveChangesButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(message, { exact: false })).toBeInTheDocument()
    );
    for (const error in errors) {
      await waitFor(() =>
        expect(
          screen.getByText(errors[error], { exact: false })
        ).toBeInTheDocument()
      );
    }
  });
  test("check exams.publishExam route", async () => {
    const { message } = changeRequestResponseTo422({
      route: apiRoutes.exams.publishExam(":examId"),
      method: "put",
      fields: [],
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider>
          <UpdateExamPage />
        </UpdateExamProvider>
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    const publishButton = await screen.findByRole("button", {
      name: /publish/i,
    });
    userEvent.click(publishButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(message, { exact: false })).toBeInTheDocument()
    );
  });
  test("check exams.unpublishExam route", async () => {
    const { message } = changeRequestResponseTo422({
      route: apiRoutes.exams.unpublishExam(":examId"),
      method: "put",
      fields: [],
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.updateExam(":examId")}>
        <UpdateExamProvider>
          <UpdateExamPage />
        </UpdateExamProvider>
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.updateExam(1),
      }
    );

    const publishButton = await screen.findByRole("button", {
      name: /publish/i,
    });
    userEvent.click(publishButton);

    const unpublishButton = await screen.findByRole("button", {
      name: /unpublish/i,
    });
    userEvent.click(unpublishButton);

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(screen.getByText(message, { exact: false })).toBeInTheDocument()
    );
  });
});

describe.skip("check other errors", () => {});
