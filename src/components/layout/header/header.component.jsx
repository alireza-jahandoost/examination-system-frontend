import { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import breakpoints from "../../../constants/breakpoints.constant";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import LoginPopover from "./login-popover.component";
import RegisterPopover from "./register-popover.component";

import Search from "./search.component";
const Header = () => {
  const [popover, setPopover] = useState("");
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user && popover !== "") {
      setPopover("");
    }
  }, [user, popover]);

  const isLargeOrBigger = useMediaQuery({ minWidth: breakpoints.lg });
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <div role="banner">
            <Navbar.Brand title="Visit the main page" href="#home">
              React-Bootstrap
            </Navbar.Brand>
          </div>
          {!isLargeOrBigger && <Search className="ms-auto me-2" />}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#exams">Exams</Nav.Link>
              <Nav.Link href="#about-us">About us</Nav.Link>
              <Nav.Link href="#contact-us">Contact us</Nav.Link>
            </Nav>
            <Nav>
              {isLargeOrBigger && <Search className="ms-auto me-2" />}

              {user ? (
                <>
                  <Nav.Link href="#profile">Profile</Nav.Link>
                  <Nav.Link role="button">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => setPopover("login")}
                    role="button"
                    title="see login popover"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => setPopover("register")}
                    role="button"
                    title="see register popover"
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {popover === "login" && (
        <LoginPopover onPopoverClose={() => setPopover("")} />
      )}
      {popover === "register" && (
        <RegisterPopover onPopoverClose={() => setPopover("")} />
      )}
    </div>
  );
};

export default Header;
