import { useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCogs,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  OverlayTrigger,
  Popover,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import LoginPopover from "./login-popover.component";
import RegisterPopover from "./register-popover.component";
import programRoutes from "../../../constants/program-routes.constant";
import "./header.styles.css";

const Header = () => {
  const { user, logout, popover, changePopover } = useContext(
    AuthenticationContext
  );
  const toggleButtonRef = useRef();

  const closeMenu = () => {
    if (
      toggleButtonRef.current?.classList &&
      !Array.from(toggleButtonRef.current?.classList).includes("collapsed")
    ) {
      toggleButtonRef.current.click();
    }
  };

  const userPopover = user ? (
    <Popover className="d-none d-lg-inline-block" id="popover-basic">
      <Popover.Header className="px-5" as="h3">
        {user.user_name.length > 28
          ? `${user.user_name.substr(0, 25)}...`
          : user.user_name}
      </Popover.Header>
      <Popover.Body>
        <Nav.Link
          as={Link}
          onClick={closeMenu}
          className="text-dark p-0 user-popover-link"
          to={programRoutes.profile()}
        >
          <span className="pe-2">
            <FontAwesomeIcon icon={faUser} />
          </span>

          <span>Profile</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          onClick={closeMenu}
          className="text-dark p-0 user-popover-link"
          to={programRoutes.settings()}
        >
          <span className="pe-2">
            <FontAwesomeIcon icon={faCogs} />
          </span>

          <span>Settings</span>
        </Nav.Link>
        <Nav.Link
          className="text-dark p-0 user-popover-link"
          onClick={() => {
            logout();
            closeMenu();
          }}
          role="button"
        >
          <span className="pe-2">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>

          <span>Logout</span>
        </Nav.Link>
      </Popover.Body>
    </Popover>
  ) : null;

  useEffect(() => {
    if (user && popover !== "") {
      changePopover("");
    }
  }, [user, popover, changePopover]);

  return (
    <div style={{ paddingBottom: "54px" }}>
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
              {user && (
                <>
                  {" "}
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
                </>
              )}
            </Nav>
            <Nav>
              {user ? (
                <>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={userPopover}
                    className="d-none d-lg-inline-block"
                  >
                    <Button variant="dark" className="d-none d-lg-inline-block">
                      {user.user_name.length > 18
                        ? `${user.user_name.substr(0, 15)}...`
                        : user.user_name}
                      {" ▾"}
                    </Button>
                  </OverlayTrigger>
                  <hr className="border d-lg-none" />
                  <Nav.Link
                    className="d-lg-none"
                    as={Link}
                    onClick={closeMenu}
                    to={programRoutes.profile()}
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    className="d-lg-none"
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
