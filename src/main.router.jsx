import { Switch, Redirect, Route } from "react-router-dom";
import ExamsRouter from "./pages/exams/exams.router";
import ProfileRouter from "./pages/profile/profile.router";
import programRoutes from "./constants/program-routes.constant";
import ProfileContainer from "./components/profile-container/profile-container.component";

const MainRouter = () => {
  return (
    <ProfileContainer>
      <Switch>
        <Route path={programRoutes.examsRoot()} component={ExamsRouter} />
        <Route path={programRoutes.profile()} component={ProfileRouter} />
        <Route
          path="*"
          render={() => <Redirect to={programRoutes.profile()} />}
        />
      </Switch>
    </ProfileContainer>
  );
};

export default MainRouter;
