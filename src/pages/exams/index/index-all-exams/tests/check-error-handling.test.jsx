import {
  waitFor,
  renderWithAuthentication,
} from "../../../../../test-utils/testing-library-utils";
import { changeRequestResponseTo401 } from "../../../../../utilities/tests.utility";

import IndexAllExamsPage from "../index-all-exams.page";

import apiRoutes from "../../../../../constants/api-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check participants.finishExam route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.indexAllExams(),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(<IndexAllExamsPage />, {
      authenticationProviderProps: { removeUserInfo },
    });

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
