import { useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import LoginPopover from "./login-popover.component";
import RegisterPopover from "./register-popover.component";
import programRoutes from "../../../constants/program-routes.constant";

const Header = () => {
  const { user, logout, popover, changePopover } = useContext(
    AuthenticationContext
  );
  const toggleButtonRef = useRef();

  useEffect(() => {
    if (user && popover !== "") {
      changePopover("");
    }
  }, [user, popover, changePopover]);

  const closeMenu = () => {
    if (
      toggleButtonRef.current?.classList &&
      !Array.from(toggleButtonRef.current?.classList).includes("collapsed")
    ) {
      toggleButtonRef.current.click();
    }
  };

  return (
    <div style={{ paddingBottom: "56px" }}>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <div role="banner">
            <Navbar.Brand
              as={Link}
              onClick={closeMenu}
              title="Visit the main page"
              to="/"
            >
              React-Bootstrap
            </Navbar.Brand>
          </div>
          <Navbar.Toggle
            ref={toggleButtonRef}
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                onClick={closeMenu}
                className="d-lg-none"
                to={programRoutes.profile()}
              >
                overview
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={closeMenu}
                className="d-lg-none"
                to={programRoutes.indexAllExams()}
              >
                all exams
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={closeMenu}
                className="d-lg-none"
                to={programRoutes.indexCreatedExams()}
              >
                created exams
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={closeMenu}
                className="d-lg-none"
                to={programRoutes.createExam()}
              >
                create new exam
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={closeMenu}
                className="d-lg-none"
                to={programRoutes.indexParticipatedExams()}
              >
                participatedExams
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={closeMenu}
                className="d-lg-none"
                to={programRoutes.settings()}
              >
                settings
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link
                    as={Link}
                    onClick={closeMenu}
                    to={programRoutes.profile()}
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    role="button"
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={programRoutes.login()}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to={programRoutes.register()}>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {popover === "login" && <LoginPopover />}
      {popover === "register" && <RegisterPopover />}
    </div>
  );
};

export default Header;
