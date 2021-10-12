import Layout from "./components/layout/layout.component";
import ExamsIndex from "./pages/exams/index/index.page";
import ProfilePage from "./pages/profile/profile.page";
import AboutUsPage from "./pages/about-us/about-us.page";
import ContactUsPage from "./pages/contact-us/contact-us.page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationProvider } from "./contexts/authentication-context/authentication.context";
import { NotificationProvider } from "./contexts/notification-context/notification.context";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthenticationProvider>
          <Layout>
            <Switch>
              <Route path="/exams" component={ExamsIndex} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/contact-us" component={ContactUsPage} />
              <Route path="/about-us" component={AboutUsPage} />
            </Switch>
          </Layout>
        </AuthenticationProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
