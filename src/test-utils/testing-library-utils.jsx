import { render } from "@testing-library/react";
import { AuthenticationProvider } from "../contexts/authentication-context/authentication.context";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "../contexts/notification-context/notification.context";
import { MemoryRouter } from "react-router-dom";

const wrapper = ({ children }) => {
  return (
    <Router>
      <NotificationProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </NotificationProvider>
    </Router>
  );
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: wrapper, ...options });

export const renderWithRouter = (
  ui,
  { route = "/", withContexts = false } = {}
) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: withContexts ? wrapper : MemoryRouter });
};

export * from "@testing-library/react";

export { renderWithContext as render };
