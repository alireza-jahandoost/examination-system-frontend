import {
  waitFor,
  renderWithAuthentication,
} from "../../../../../test-utils/testing-library-utils";
import { changeRequestResponseTo401 } from "../../../../../utilities/tests.utility";

import CreatedExamsPage from "../created-exams.page";

import apiRoutes from "../../../../../constants/api-routes.constant";
import programRoutes from "../../../../../constants/program-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check exams.indexCreatedExams route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.exams.indexCreatedExams(),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(<CreatedExamsPage />, {
      authenticationProviderProps: { removeUserInfo },
      route: programRoutes.indexCreatedExams(),
    });

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
