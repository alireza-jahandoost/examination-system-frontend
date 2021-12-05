import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import ExamsRouter from "./pages/exams/exams.router";
import ProfileRouter from "./pages/profile/profile.router";
import AboutUsPage from "./pages/about-us/about-us.page";
import ContactUsPage from "./pages/contact-us/contact-us.page";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import { AuthenticationContext } from "./contexts/authentication-context/authentication.context";
import programRoutes from "./constants/program-routes.constant";
import LoginPage from "./pages/login/login.page";
import RegisterPage from "./pages/register/register.page";

const MainRouter = () => {
  const { redirectIfNotAuthenticated, isAuthLoaded } = useContext(
    AuthenticationContext
  );
  if (!isAuthLoaded) {
    return <p> Loading... </p>;
  }
  return (
    <ErrorBoundary>
      <div style={{ minHeight: "100vh" }} className="d-flex flex-column">
        <Switch>
          <Route path={programRoutes.examsRoot()} component={ExamsRouter} />
          <Route
            path={programRoutes.profile()}
            render={({ location }) =>
              redirectIfNotAuthenticated(<ProfileRouter />, location)
            }
          ></Route>
          <Route path={programRoutes.contactUs()} component={ContactUsPage} />
          <Route path={programRoutes.aboutUs()} component={AboutUsPage} />
          <Route path={programRoutes.login()} component={LoginPage} />
          <Route path={programRoutes.register()} component={RegisterPage} />
        </Switch>
      </div>
    </ErrorBoundary>
  );
};

export default MainRouter;
