import { render, screen } from "@testing-library/react";
import Footer from "../footer.component";

test("footer must contain brand, about us, contact us, exams and copyright", () => {
  render(<Footer />);

  const brandLink = screen.getByTitle(/visit the main page/i);
  expect(brandLink).toBeInTheDocument();

  const examsLink = screen.getByRole("link", { name: /exams/i });
  expect(examsLink).toBeInTheDocument();

  const aboutUsLink = screen.getByRole("link", { name: /about us/i });
  expect(aboutUsLink).toBeInTheDocument();

  const contactUsLink = screen.getByRole("link", { name: /contact us/i });
  expect(contactUsLink).toBeInTheDocument();

  const copyright = screen.getByText(/© 2021/i);
  expect(copyright).toBeInTheDocument();
});
