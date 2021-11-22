import {
  renderWithAuthentication,
  screen,
} from "../../../../../test-utils/testing-library-utils";
import { Route } from "react-router-dom";
import ShowParticipantPage from "../show-participant.page";

import { wait } from "../../../../../utilities/tests.utility";

import programRoutes from "../../../../../constants/program-routes.constant";

const wrapper = (ui) => {
  return (
    <Route path={programRoutes.showParticipant(":examId", ":participantId")}>
      {ui}
    </Route>
  );
};

test("all the inputs must be readonly or disabled except grade inputs", async () => {
  renderWithAuthentication(wrapper(<ShowParticipantPage />), {
    route: programRoutes.showParticipant(1, 1),
  });
  await wait(200);

  const textboxes = await screen.findAllByRole("textbox");
  for (const textbox of textboxes) {
    if (textbox.id.startsWith("grade-of-question")) {
      continue;
    }
    expect(textbox).toHaveAttribute("readonly");
  }

  const radios = await screen.findAllByRole("radio");
  for (const radio of radios) {
    expect(radio).toBeDisabled();
  }

  const checkboxes = await screen.findAllByRole("checkbox");
  for (const checkbox of checkboxes) {
    expect(checkbox).toBeDisabled();
  }

  const buttons = await screen.findAllByRole("button");
  for (const button of buttons) {
    if (!button.title.startsWith("move this item")) {
      continue;
    }
    expect(button).toBeDisabled();
  }
});
