import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import programRoutes from "../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

import IndexParticipantsPage from "./index/index-participants.page";
import ShowParticipantPage from "./show/show-participant.page";

const ParticipantsRouter = () => {
  const { isAuthLoaded } = useContext(AuthenticationContext);

  if (!isAuthLoaded) {
    return <p> Loading... </p>;
  }

  return (
    <Switch>
      <Route
        exact
        path={programRoutes.indexParticipants(":examId")}
        component={IndexParticipantsPage}
      />

      <Route
        exact
        path={programRoutes.showParticipant(":examId", ":participantId")}
        component={ShowParticipantPage}
      />
    </Switch>
  );
};

export default ParticipantsRouter;
