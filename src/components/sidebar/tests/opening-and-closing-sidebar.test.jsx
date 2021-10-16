import { render, screen } from "../../../test-utils/testing-library-utils";
import Sidebar from "../sidebar.component";
import userEvent from "@testing-library/user-event";

test("user can open and close the sidebar by toggler", async () => {
  render(<Sidebar />);

  expect(screen.queryByText(/overview/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/created exams/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/participated exams/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();

  const overviewIcon = screen.getByRole("link", { name: /overview/i });
  const createdExamsIcon = screen.getByRole("link", { name: /created exams/i });
  const participatedExamsIcon = screen.getByRole("link", {
    name: /participated exams/i,
  });
  const settingsIcon = screen.getByRole("link", { name: /settings/i });

  expect(overviewIcon).toBeInTheDocument();
  expect(createdExamsIcon).toBeInTheDocument();
  expect(participatedExamsIcon).toBeInTheDocument();
  expect(settingsIcon).toBeInTheDocument();

  const toggler = screen.getByRole("button", { name: /toggle sidebar/i });
  userEvent.click(toggler);

  expect(overviewIcon).toBeInTheDocument();
  expect(createdExamsIcon).toBeInTheDocument();
  expect(participatedExamsIcon).toBeInTheDocument();
  expect(settingsIcon).toBeInTheDocument();

  expect(screen.getByText(/overview/i)).toBeInTheDocument();
  expect(screen.getByText(/created exams/i)).toBeInTheDocument();
  expect(screen.getByText(/participated exams/i)).toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();

  userEvent.click(toggler);

  expect(screen.queryByText(/overview/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/created exams/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/participated exams/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
});
