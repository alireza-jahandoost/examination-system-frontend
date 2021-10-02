import { render } from "@testing-library/react";
import { AuthenticationProvider } from "../contexts/authentication-context/authentication.context";
import { NotificationProvider } from "../contexts/notification-context/notification.context";

const wrapper = ({ children }) => (
  <NotificationProvider>
    <AuthenticationProvider>{children}</AuthenticationProvider>
  </NotificationProvider>
);

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: wrapper, ...options });

export * from "@testing-library/react";

export { renderWithContext as render };
