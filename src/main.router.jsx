import { useContext } from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";
import ExamsRouter from "./pages/exams/exams.router";
import ProfileRouter from "./pages/profile/profile.router";
import AboutUsPage from "./pages/about-us/about-us.page";
import ContactUsPage from "./pages/contact-us/contact-us.page";
import { ErrorBoundaryProvider } from "./contexts/error-boundary-context/error-boundary.context";
import { AuthenticationContext } from "./contexts/authentication-context/authentication.context";
import programRoutes from "./constants/program-routes.constant";
import LoginPage from "./pages/login/login.page";
import RegisterPage from "./pages/register/register.page";
import { getParams, createPath } from "./utilities/url.utility";

const MainRouter = () => {
  const {
    redirectIfNotAuthenticated,
    isAuthLoaded,
    isUserAuthenticated,
  } = useContext(AuthenticationContext);
  const location = useLocation();

  if (!isAuthLoaded) {
    return <p> Loading... </p>;
  }
  if (
    !isUserAuthenticated &&
    location.pathname !== programRoutes.redirectUnAuthenticated() &&
    location.pathname !== programRoutes.login() &&
    location.pathname !== programRoutes.register()
  ) {
    return (
      <Redirect
        to={`${programRoutes.redirectUnAuthenticated()}?redirect=${encodeURIComponent(
          createPath({
            pathName: location.pathname,
            params: getParams({ url: location.search }),
          })
        )}`}
      />
    );
  }
  return (
    <ErrorBoundaryProvider>
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
    </ErrorBoundaryProvider>
  );
};

export default MainRouter;
