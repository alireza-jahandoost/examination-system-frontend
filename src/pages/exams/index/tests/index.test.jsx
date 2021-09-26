import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Index from "../index.page";

const PAGE_SIZE = 18;
const TOTAL_NUMBER_OF_EXAMS = 50;

const wait = (time) =>
  act(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  });

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

      const exams = await screen.findAllByRole("button", { name: /register/i });

      expect(exams).toHaveLength(PAGE_SIZE);
    }
  );
});

test(
  "with scrolling, every time " + PAGE_SIZE + " exams must be added",
  async () => {
    render(<Index />);

    const loading = screen.getByText(/loading.../i);
    expect(loading).toBeInTheDocument();

    const exams = await screen.findAllByRole("button", { name: /register/i });
    expect(exams).toHaveLength(PAGE_SIZE);

    fireEvent.scroll(window, { target: { scrollTop: -500 } });
    fireEvent.scroll(window, { target: { scrollTop: 0 } });

    await wait(200);

    await waitFor(async () =>
      expect(
        await screen.findAllByRole("button", { name: /register/i })
      ).toHaveLength(2 * PAGE_SIZE)
    );
  }
);

test("when all of the exams loaded, user mustn't see any Loading", async () => {
  render(<Index />);

  const loading = screen.getByText(/loading.../i);
  expect(loading).toBeInTheDocument();

  const exams = await screen.findAllByRole("button", { name: /register/i });
  expect(exams).toHaveLength(PAGE_SIZE);

  fireEvent.scroll(window, { target: { scrollTop: -500 } });
  fireEvent.scroll(window, { target: { scrollTop: 0 } });

  await wait(200);

  await waitFor(async () =>
    expect(
      await screen.findAllByRole("button", { name: /register/i })
    ).toHaveLength(2 * PAGE_SIZE)
  );

  fireEvent.scroll(window, { target: { scrollTop: -500 } });
  fireEvent.scroll(window, { target: { scrollTop: 0 } });

  await wait(200);

  await waitFor(async () =>
    expect(
      await screen.findAllByRole("button", { name: /register/i })
    ).toHaveLength(TOTAL_NUMBER_OF_EXAMS)
  );

  fireEvent.scroll(window, { target: { scrollTop: -500 } });
  fireEvent.scroll(window, { target: { scrollTop: 0 } });

  const nullLoading = screen.queryByText(/loading/i);
  expect(nullLoading).not.toBeInTheDocument();
});
