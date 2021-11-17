import { useContext } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import programRoutes from "../../../constants/program-routes.constant";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import { ExaminingProvider } from "../../../contexts/examining-context/examining.context";
import { ExamInfoProvider } from "../../../contexts/exam-info-context/exam-info.context";

import ExamOverview from "./exam-overview/exam-overview.page";
import ExamQuestion from "./exam-question/exam-question.page";

const ExaminingRouter = () => {
  const { redirectIfNotAuthenticated, isAuthLoaded } = useContext(
    AuthenticationContext
  );

  const { examId } = useParams();

  if (!isAuthLoaded) {
    return <p> Loading... </p>;
  }

  return (
    <ExamInfoProvider examId={examId}>
      <ExaminingProvider>
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
      </ExaminingProvider>
    </ExamInfoProvider>
  );
};

export default ExaminingRouter;
