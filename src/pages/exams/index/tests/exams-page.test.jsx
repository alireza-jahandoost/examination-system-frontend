import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { wait, wrapWithWidth } from "../../../../utilities/tests.utility";
import Index from "../index.page";

const PAGE_SIZE = 18;
const TOTAL_NUMBER_OF_EXAMS = 50;

describe("initial conditions", () => {
  test("there is a search section to search exams", () => {
    render(<Index />);

    const searchSection = screen.getByRole("search");
    expect(searchSection).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("Search Exam");
    expect(searchInput).toBeInTheDocument();
  });
  test(
    "when pages loads, a loading will be displayed and then " +
      PAGE_SIZE +
      " exams must be loaded",
    async () => {
      render(<Index />);

      const loading = screen.getByText(/loading.../i);
      expect(loading).toBeInTheDocument();

      const exams = await screen.findAllByRole("button", {
        name: /more details/i,
      });

      expect(exams).toHaveLength(PAGE_SIZE);
    }
  );
});

describe("check exams loadings", () => {
  test(
    "with scrolling, every time " + PAGE_SIZE + " exams must be added",
    async () => {
      render(<Index />);

      const loading = screen.getByText(/loading.../i);
      expect(loading).toBeInTheDocument();

      const exams = await screen.findAllByRole("button", {
        name: /more details/i,
      });
      expect(exams).toHaveLength(PAGE_SIZE);

      fireEvent.scroll(window, { target: { scrollTop: -500 } });
      fireEvent.scroll(window, { target: { scrollTop: 0 } });

      await wait(100);

      await waitFor(async () =>
        expect(
          await screen.findAllByRole("button", { name: /more details/i })
        ).toHaveLength(2 * PAGE_SIZE)
      );
    }
  );

  test("when all of the exams loaded, user mustn't see any Loading", async () => {
    render(<Index />);

    const loading = screen.getByText(/loading.../i);
    expect(loading).toBeInTheDocument();

    const exams = await screen.findAllByRole("button", {
      name: /more details/i,
    });
    expect(exams).toHaveLength(PAGE_SIZE);

    fireEvent.scroll(window, { target: { scrollTop: -500 } });
    fireEvent.scroll(window, { target: { scrollTop: 0 } });

    await wait(100);

    await waitFor(async () =>
      expect(
        await screen.findAllByRole("button", { name: /more details/i })
      ).toHaveLength(2 * PAGE_SIZE)
    );

    fireEvent.scroll(window, { target: { scrollTop: -500 } });
    fireEvent.scroll(window, { target: { scrollTop: 0 } });

    await wait(100);

    await waitFor(async () =>
      expect(
        await screen.findAllByRole("button", { name: /more details/i })
      ).toHaveLength(TOTAL_NUMBER_OF_EXAMS)
    );

    fireEvent.scroll(window, { target: { scrollTop: -500 } });
    fireEvent.scroll(window, { target: { scrollTop: 0 } });

    const nullLoading = screen.queryByText(/loading/i);
    expect(nullLoading).not.toBeInTheDocument();
  });
});

describe("check opening and closing the exam descriptions", () => {
  test("user can close exam description by button, on Desktop", async () => {
    render(wrapWithWidth(<Index />, 1300));
    const moreDetailsButtons = await screen.findAllByRole("button", {
      name: /more details/i,
    });
    userEvent.click(moreDetailsButtons[0]);

    const closeButton = await screen.findByRole("button", { name: /close/i });

    userEvent.click(closeButton);
    const nullCloseButton = screen.queryByRole("button", { name: /close/i });
    expect(nullCloseButton).not.toBeInTheDocument();

    const nullRegisterButton = screen.queryByRole("button", {
      name: /register/i,
    });
    expect(nullRegisterButton).not.toBeInTheDocument();
  });
  test("user can close exam description by button, on Mobile", async () => {
    render(wrapWithWidth(<Index />, 800));
    const moreDetailsButtons = await screen.findAllByRole("button", {
      name: /more details/i,
    });
    userEvent.click(moreDetailsButtons[0]);

    const closeButton = await screen.findByRole("button", { name: /close/i });

    userEvent.click(closeButton);
    const nullCloseButton = screen.queryByRole("button", { name: /close/i });
    expect(nullCloseButton).not.toBeInTheDocument();

    const nullRegisterButton = screen.queryByRole("button", {
      name: /register/i,
    });
    expect(nullRegisterButton).not.toBeInTheDocument();
  });
});
