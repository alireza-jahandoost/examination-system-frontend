import Layout from "./components/layout/layout.component";
import ExamsIndex from "./pages/exams/index/index.page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/exams" component={ExamsIndex} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
