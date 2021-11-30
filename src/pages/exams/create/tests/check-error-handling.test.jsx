import {
  waitFor,
  screen,
  renderWithAuthentication,
} from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseTo401 } from "../../../../utilities/tests.utility";

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

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
