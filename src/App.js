import { useContext } from "react";
import Layout from "./components/layout/layout.component";
import AppRouter from "./app.router";
import { AuthenticationContext } from "./contexts/authentication-context/authentication.context";

function App() {
  const { isAuthLoaded } = useContext(AuthenticationContext);

  if (!isAuthLoaded) {
    return <p> Loading... </p>;
  }
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
