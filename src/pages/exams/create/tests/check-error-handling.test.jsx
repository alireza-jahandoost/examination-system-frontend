import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import {
  changeRequestResponseTo401,
  changeRequestResponseTo422,
} from "../../../../utilities/tests.utility";

import CreateExamForm from "../create-exam-form.component";

import apiRoutes from "../../../../constants/api-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check exams.createExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.createExam(),
      method: "post",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(<CreateExamForm />, {
      authenticationProviderProps: { removeUserInfo },
    });

    const examNameField = await screen.findByRole("textbox", {
      name: /exam name/i,
    });
    userEvent.clear(examNameField);
    userEvent.type(examNameField, "aaa");

    const createExamButton = screen.getByRole("button", {
      name: /create/i,
    });

    userEvent.click(createExamButton);

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
  test("check exams.createExam route", async () => {
    const { message, errors } = changeRequestResponseTo422({
      route: apiRoutes.exams.createExam(),
      method: "post",
      fields,
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(<CreateExamForm />, {
      authenticationProviderProps: { removeUserInfo },
    });

    const examNameField = await screen.findByRole("textbox", {
      name: /exam name/i,
    });
    userEvent.clear(examNameField);
    userEvent.type(examNameField, "aaa");

    const needsPasswordCheckbox = screen.getByRole("checkbox", {
      name: /needs password/i,
    });
    userEvent.click(needsPasswordCheckbox);

    const createExamButton = screen.getByRole("button", {
      name: /create/i,
    });

    userEvent.click(createExamButton);

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
});

describe.skip("check other errors", () => {});
