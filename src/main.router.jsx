import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import ExamsRouter from "./pages/exams/exams.router";
import ProfileRouter from "./pages/profile/profile.router";
import AboutUsPage from "./pages/about-us/about-us.page";
import ContactUsPage from "./pages/contact-us/contact-us.page";
import { AuthenticationContext } from "./contexts/authentication-context/authentication.context";
import programRoutes from "./constants/program-routes.constant";

const MainRouter = () => {
  const { redirectIfNotAuthenticated } = useContext(AuthenticationContext);
  return (
    <Switch>
      <Route path={programRoutes.examsRoot()} component={ExamsRouter} />
      <Route
        path={programRoutes.profile()}
        render={({ location }) =>
          redirectIfNotAuthenticated(
            <div style={{ minHeight: "100vh" }} className="d-flex">
              <ProfileRouter />
            </div>,
            location
          )
        }
      ></Route>
      <Route path={programRoutes.contactUs()} component={ContactUsPage} />
      <Route path={programRoutes.aboutUs()} component={AboutUsPage} />
    </Switch>
  );
};

export default MainRouter;
