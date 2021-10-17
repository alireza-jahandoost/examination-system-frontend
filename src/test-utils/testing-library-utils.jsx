import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { AuthenticationProvider } from "../contexts/authentication-context/authentication.context";
import { NotificationProvider } from "../contexts/notification-context/notification.context";
import { MemoryRouter } from "react-router-dom";

const wrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <NotificationProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </NotificationProvider>
    </MemoryRouter>
  );
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: wrapper, ...options });

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: MemoryRouter });
};

export * from "@testing-library/react";

export { renderWithContext as render };
