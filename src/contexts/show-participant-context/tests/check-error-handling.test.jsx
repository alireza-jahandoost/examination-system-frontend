import {
  waitFor,
  renderWithAuthentication,
} from "../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import { changeRequestResponseTo401 } from "../../../utilities/tests.utility";

import { ShowParticipantProvider } from "../show-participant.context";

import apiRoutes from "../../../constants/api-routes.constant";
import programRoutes from "../../../constants/program-routes.constant";

describe("check 401 errors(the removeUserInfo() func from authentication context must be called)", () => {
  test("check participants.showParticipant route", async () => {
    changeRequestResponseTo401({
      route: apiRoutes.participants.showParticipant(
        ":examId",
        ":participantId"
      ),
      method: "get",
    });

    const removeUserInfo = jest.fn();
    renderWithAuthentication(
      <Route path={programRoutes.showParticipant(":examId", ":participantId")}>
        <ShowParticipantProvider />
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.showParticipant(2, 1),
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
      <Route path={programRoutes.showParticipant(":examId", ":participantId")}>
        <ShowParticipantProvider />
      </Route>,
      {
        authenticationProviderProps: { removeUserInfo },
        route: programRoutes.showParticipant(2, 1),
      }
    );

    await waitFor(() => expect(removeUserInfo).toHaveBeenCalledTimes(1));
  });
});

describe.skip("check other errors", () => {});
