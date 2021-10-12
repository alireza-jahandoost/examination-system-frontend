import { render, screen } from "../../../../test-utils/testing-library-utils";
import Header from "../header.component";

import { wrapWithWidth } from "../../../../utilities/tests.utility";
import breakpoints from "../../../../constants/breakpoints.constant";

describe("check initial conditions", () => {
  test("in size less than large, header will contain brand, exams, about us, contact us, login, register", () => {
    render(wrapWithWidth(<Header />, breakpoints.lg - 1));

    const brandContainer = screen.getByRole("banner");
    expect(brandContainer).toBeInTheDocument();

    const brandLink = screen.getByTitle(/visit the main page/i);
    expect(brandLink).toBeInTheDocument();

    const examsLink = screen.getByRole("link", { name: /exams/i });
    expect(examsLink).toBeInTheDocument();

    const aboutUsLink = screen.getByRole("link", { name: /about us/i });
    expect(aboutUsLink).toBeInTheDocument();

    const contactUsLink = screen.getByRole("link", { name: /contact us/i });
    expect(contactUsLink).toBeInTheDocument();

    const loginLink = screen.getByRole("button", { name: /login/i });
    expect(loginLink).toBeInTheDocument();

    const registerLink = screen.getByRole("button", { name: /register/i });
    expect(registerLink).toBeInTheDocument();
  });
});
