import {
  waitFor,
  renderWithAuthentication,
} from "../../../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import { changeRequestResponseTo401 } from "../../../../../utilities/tests.utility";

import IndexParticipantsPage from "../index-participants.page";

import apiRoutes from "../../../../../constants/api-routes.constant";
import programRoutes from "../../../../../constants/program-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check participants.indexParticipants route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.indexParticipants(),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route to={programRoutes.indexParticipants(":examId")}>
        <IndexParticipantsPage />
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.indexParticipants(1),
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check 422 errors", () => {});

describe.skip("check other errors", () => {});
