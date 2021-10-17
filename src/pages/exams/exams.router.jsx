import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import programRoutes from "../../constants/program-routes.constant";

import IndexAllExamsPage from "./index/index-all-exams/index-all-exams.page";
import IndexParticipatedExamsPage from "./index/index-participated-exams/participated-exams.page";
import IndexCreatedExamsPage from "./index/index-created-exams/created-exams.page";

import CreateExamPage from "./create/create-exam.page";
import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";

const ProfileRouter = () => {
  const { redirectIfNotAuthenticated } = useContext(AuthenticationContext);
  return (
    <Switch>
      <Route
        exact
        path={programRoutes.indexAllExams}
        component={IndexAllExamsPage}
      />

      <Route
        exact
        path={programRoutes.indexParticipatedExams}
        render={({ location }) =>
          redirectIfNotAuthenticated(<IndexParticipatedExamsPage />, location)
        }
      />
      <Route
        exact
        path={programRoutes.indexCreatedExams}
        render={({ location }) =>
          redirectIfNotAuthenticated(<IndexCreatedExamsPage />, location)
        }
      />
      <Route
        exact
        path={programRoutes.createExam}
        render={({ location }) =>
          redirectIfNotAuthenticated(<CreateExamPage />, location)
        }
      />
    </Switch>
  );
};

export default ProfileRouter;
