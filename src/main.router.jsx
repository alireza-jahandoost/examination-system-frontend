import { useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import ExamsRouter from "./pages/exams/exams.router";
import ProfileRouter from "./pages/profile/profile.router";
import AboutUsPage from "./pages/about-us/about-us.page";
import ContactUsPage from "./pages/contact-us/contact-us.page";
import { AuthenticationContext } from "./contexts/authentication-context/authentication.context";
const MainRouter = () => {
  const { redirectIfNotAuthenticated } = useContext(AuthenticationContext);
  return (
    <Switch>
      <Route path="/exams" component={ExamsRouter} />
      <Route
        path="/profile"
        render={({ location }) =>
          redirectIfNotAuthenticated(
            <div style={{ minHeight: "100vh" }} className="d-flex">
              <ProfileRouter />
            </div>,
            location
          )
        }
      ></Route>
      <Route path="/contact-us" component={ContactUsPage} />
      <Route path="/about-us" component={AboutUsPage} />
    </Switch>
  );
};

export default MainRouter;
