import Layout from "./components/layout/layout.component";
import ExamsIndex from "./pages/exams/index/index.page";
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
            </Switch>
          </Layout>
        </AuthenticationProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
