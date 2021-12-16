import {
  screen,
  waitFor,
  renderWithAuthentication,
} from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { changeRequestResponseToSpecificStatus } from "../utilities/tests.utility";
import apiRoutes from "../constants/api-routes.constant";
import programRoutes from "../constants/program-routes.constant";
import App from "../App";
import { userName } from "../mocks/mocks/authentication.mock";

test("when user occured to an error and then changed his page, the error must be gone", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  changeRequestResponseToSpecificStatus({
    route: apiRoutes.exams.indexAllExams(),
    status: 403,
    method: "get",
  });

  renderWithAuthentication(<App />, { route: programRoutes.indexAllExams() });

  await waitFor(() => expect(screen.getByText(403)).toBeInTheDocument());

  const validator = new RegExp(userName, "i");
  userEvent.click(await screen.findByRole("button", { name: validator }));
  const profileLink = screen.getByRole("link", { name: /profile/i });
  userEvent.click(profileLink);

  await waitFor(() => expect(screen.queryByText(403)).not.toBeInTheDocument());
});
