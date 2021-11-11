import {
  renderWithRouter,
  waitFor,
} from "../../../../test-utils/testing-library-utils";
import programRoutes from "../../../../constants/program-routes.constant";
import App from "../../../../App";

test("user can not see the questions without authentication", async () => {
  renderWithRouter(<App />, {
    route: programRoutes.examiningQuestion(1, 1),
    withContexts: true,
  });

  await waitFor(() => expect(window.location.pathname).toBe("/"));
});
