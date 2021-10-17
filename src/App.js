import Layout from "./components/layout/layout.component";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticationProvider } from "./contexts/authentication-context/authentication.context";
import { NotificationProvider } from "./contexts/notification-context/notification.context";
import MainRouter from "./main.router";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthenticationProvider>
          <Layout>
            <MainRouter />
          </Layout>
        </AuthenticationProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
