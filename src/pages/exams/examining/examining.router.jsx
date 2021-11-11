import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import programRoutes from "../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

import ExamOverview from "./exam-overview/exam-overview.page";
import ExamQuestion from "./exam-question/exam-question.page";

const ExaminingRouter = () => {
  const { redirectIfNotAuthenticated, isAuthLoaded } = useContext(
    AuthenticationContext
  );

  if (!isAuthLoaded) {
    return <p> Loading... </p>;
  }

  return (
    <Switch>
      <Route
        exact
        path={programRoutes.examiningOverview(":examId")}
        component={ExamOverview}
      />

      <Route
        exact
        path={programRoutes.examiningQuestion(":examId", ":questionId")}
        render={({ location }) =>
          redirectIfNotAuthenticated(<ExamQuestion />, location)
        }
      />
    </Switch>
  );
};

export default ExaminingRouter;
