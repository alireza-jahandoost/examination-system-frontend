import {
  renderWithAuthentication,
  waitFor,
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

test("if the status of participant was NOT_FINISHED, the grade input and grade must not be shown", async () => {
  renderWithAuthentication(wrapper(<ShowParticipantPage />), {
    route: programRoutes.showParticipant(1, 4),
  });

  await wait(200);

  expect(
    screen.queryByText(`grade:`, { exact: false })
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("spinbutton", { name: /grade/i })
  ).not.toBeInTheDocument();
});

test("if the status of participant is IS_PROCESSING, the grade input and grade must not be shown", async () => {
  renderWithAuthentication(wrapper(<ShowParticipantPage />), {
    route: programRoutes.showParticipant(1, 3),
  });

  await wait(200);

  expect(
    screen.queryByText(`grade:`, { exact: false })
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("spinbutton", { name: /grade/i })
  ).not.toBeInTheDocument();
});

test("if the status of participant is WAIT_FOR_MANUAL_CORRECTING, the grade input must be shown but grade must not", async () => {
  renderWithAuthentication(wrapper(<ShowParticipantPage />), {
    route: programRoutes.showParticipant(1, 2),
  });

  await wait(200);

  expect(
    screen.queryByText(`grade:`, { exact: false })
  ).not.toBeInTheDocument();

  expect(screen.getAllByRole("spinbutton", { name: /grade/i })).toHaveLength(6);
});

test("if the status of participant is FINISHED, the grade input and grade must be shown", async () => {
  renderWithAuthentication(wrapper(<ShowParticipantPage />), {
    route: programRoutes.showParticipant(1, 1),
  });

  await wait(200);

  await waitFor(() =>
    expect(screen.getAllByText(/grade:/i, { exact: false })).toHaveLength(7)
  );

  await waitFor(() =>
    expect(screen.getAllByRole("spinbutton", { name: /grade/i })).toHaveLength(
      6
    )
  );
});
