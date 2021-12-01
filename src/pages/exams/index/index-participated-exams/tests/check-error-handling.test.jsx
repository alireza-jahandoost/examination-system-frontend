import {
  waitFor,
  renderWithAuthentication,
} from "../../../../../test-utils/testing-library-utils";
import { changeRequestResponseTo401 } from "../../../../../utilities/tests.utility";

import ParticipatedExamsPage from "../participated-exams.page";

import apiRoutes from "../../../../../constants/api-routes.constant";
import programRoutes from "../../../../../constants/program-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check participants.participatedExams route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.participatedExams(),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(<ParticipatedExamsPage />, {
      authenticationProviderProps: { removeUserInfo },
      route: programRoutes.indexParticipatedExams(),
    });

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check other errors", () => {});
