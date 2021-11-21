import {
  renderWithAuthentication,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "../../../../../test-utils/testing-library-utils";
import IndexParticipantsPage from "../index-participants.page";
import programRoutes from "../../../../../constants/program-routes.constant";
import apiRoutes from "../../../../../constants/api-routes.constant";
import { indexParticipantsPage1 } from "../../../../../mocks/mocks/participants.mock";
import { emptyRequest } from "../../../../../utilities/tests.utility";

test("first of all, loading must be in the page", async () => {
  renderWithAuthentication(<IndexParticipantsPage />, {
    route: programRoutes.indexParticipants(),
  });

  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});

test("after loading, pagination must have link to other pages", async () => {
  renderWithAuthentication(<IndexParticipantsPage />, {
    route: programRoutes.indexParticipants(),
  });

  const numberOfPages = indexParticipantsPage1.meta.last_page;

  for (let i = 2; i <= numberOfPages; i++) {
    expect(await screen.findByRole("link", { name: i })).toHaveAttribute(
      "href",
      `${programRoutes.indexParticipants()}?page=${i}`
    );
  }
});

test("if there is not any created exam, loading must be gone", async () => {
  emptyRequest({
    method: "get",
    route: apiRoutes.participants.indexParticipants(1),
    objectName: "participants",
  });

  renderWithAuthentication(<IndexParticipantsPage />, {
    route: programRoutes.indexParticipants(),
  });

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
});

test("if user came to a page that do not exist, he must be redirected to the page 1", async () => {
  renderWithAuthentication(<IndexParticipantsPage />, {
    route: `${programRoutes.indexParticipants()}?page=100`,
  });

  await waitFor(() =>
    expect(
      window.location.href.endsWith(programRoutes.indexParticipants())
    ).toBe(true)
  );
});
