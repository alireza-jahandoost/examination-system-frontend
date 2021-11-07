import {
  screen,
  renderWithAuthentication,
} from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import UpdateExam from "../update-exam.page";
import { wait } from "../../../../utilities/tests.utility";
import programRoutes from "../../../../constants/program-routes.constant";
import { wrapper } from "./partials";
import { invalidSum } from "../../../../mocks/errors/failed-publish.error";

test("user can publish his exam and unpublish again", async () => {
  renderWithAuthentication(wrapper(<UpdateExam />), {
    route: programRoutes.updateExam(1),
  });
  await wait(300);

  // find and click publish button
  const publishButton = screen.getByRole("button", { name: /publish exam/i });
  userEvent.click(publishButton);
  // end

  await wait(100);

  // check for publish message
  const publishMessage = await screen.findByText(
    /you published this exam successfully/i
  );
  expect(publishMessage).toBeInTheDocument();
  // end

  // check textboxes are readonly
  const textboxes = screen.getAllByRole("textbox", { name: /question text/i });
  for (let i = 0; i < textboxes.length; i++) {
    expect(textboxes[i]).toHaveAttribute("readonly");
  }
  // end

  // find and click unpublish button
  const unpublishButton = screen.getByRole("button", {
    name: /unpublish exam/i,
  });
  userEvent.click(unpublishButton);
  // end

  // check for unpublish message
  const unpublishMessage = await screen.findByText(
    /you unpublished this exam successfully/i
  );
  expect(unpublishMessage).toBeInTheDocument();
  // end
});

test("user can not publish his exam if there is any error and he will see the error", async () => {
  renderWithAuthentication(wrapper(<UpdateExam />), {
    route: programRoutes.updateExam(3),
  });
  await wait(300);

  // find and click publish button
  const publishButton = screen.getByRole("button", { name: /publish exam/i });
  userEvent.click(publishButton);
  // end

  await wait(100);

  // check publishing error
  expect(await screen.findByText(invalidSum.data.message)).toBeInTheDocument();
  // end
});

test("if exam is published, user will see unpublish button and he can unpublish that", async () => {
  renderWithAuthentication(wrapper(<UpdateExam />), {
    route: programRoutes.updateExam(2),
  });
  await wait(300);

  // find and click unpublish button
  const unpublishButton = screen.getByRole("button", {
    name: /unpublish exam/i,
  });
  userEvent.click(unpublishButton);
  // end

  // check for unpublish message
  const unpublishMessage = await screen.findByText(
    /you unpublished this exam successfully/i
  );
  expect(unpublishMessage).toBeInTheDocument();
  // end
});
