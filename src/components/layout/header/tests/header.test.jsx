import {
  renderWithAuthentication,
  screen,
} from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Header from "../header.component";

test("on clicking on logout, logout function from authentication context must be called", () => {
  const logoutFunc = jest.fn();
  renderWithAuthentication(<Header />, {
    authenticationProviderProps: { logout: logoutFunc },
  });

  const logoutButton = screen.getByRole("button", { name: /logout/i });
  userEvent.click(logoutButton);

  expect(logoutFunc).toHaveBeenCalledTimes(1);
});
