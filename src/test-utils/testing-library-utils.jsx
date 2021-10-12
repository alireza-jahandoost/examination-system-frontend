import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { AuthenticationProvider } from "../contexts/authentication-context/authentication.context";
import { NotificationProvider } from "../contexts/notification-context/notification.context";
import { BrowserRouter } from "react-router";

const wrapper = ({ children }) => {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <NotificationProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </NotificationProvider>
    </Router>
  );
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: wrapper, ...options });

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

export * from "@testing-library/react";

export { renderWithContext as render };
