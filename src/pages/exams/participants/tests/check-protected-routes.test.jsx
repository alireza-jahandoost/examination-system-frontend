import {
  waitFor,
  renderWithRouter,
} from "../../../../test-utils/testing-library-utils";
import programRoutes from "../../../../constants/program-routes.constant";
import App from "../../../../App";

test("participants routes must be protected", async () => {
  renderWithRouter(<App />, {
    route: programRoutes.indexParticipants(1),
    withContexts: true,
  });

  await waitFor(() => expect(window.location.pathname).toBe("/"));
});
