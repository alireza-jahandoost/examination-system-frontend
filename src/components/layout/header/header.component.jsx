import { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import breakpoints from "../../../constants/breakpoints.constant";
import Login from "../../authentication/login/login.component";
import Popover from "../../popover/popover.component";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

import Search from "./search.component";
const Header = () => {
  const [isLoginShown, setIsLoginShown] = useState(false);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user && isLoginShown) {
      setIsLoginShown(false);
    }
  }, [user, isLoginShown]);

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
                    onClick={() => setIsLoginShown(true)}
                    role="button"
                    title="see login popover"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link role="button" title="see register popover">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isLoginShown && (
        <Popover onPopoverClose={() => setIsLoginShown(false)}>
          <Login />
        </Popover>
      )}
    </div>
  );
};

export default Header;
