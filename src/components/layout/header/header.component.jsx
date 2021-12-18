import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { BsHouseDoor, BsGear, BsBoxArrowRight } from "react-icons/bs";
import {
  Navbar,
  OverlayTrigger,
  Popover,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import programRoutes from "../../../constants/program-routes.constant";
import useCurrentPath from "../../../hooks/useCurrentPath";
import "./header.styles.css";

const Header = () => {
  const { user, logout } = useContext(AuthenticationContext);
  const toggleButtonRef = useRef();
  const checkCurrentPath = useCurrentPath();

  const isActive = (expected) => {
    const output = {};
    output.active = checkCurrentPath(expected);
    return output;
  };

  const closeMenu = () => {
    if (
      toggleButtonRef.current?.classList &&
      !Array.from(toggleButtonRef.current?.classList).includes("collapsed")
    ) {
      toggleButtonRef.current.click();
    }
  };

  const userPopover = user ? (
    <Popover id="popover-basic">
      <Popover.Header className="px-5" as="h3">
        {user.user_name.length > 28
          ? `${user.user_name.substr(0, 25)}...`
          : user.user_name}
      </Popover.Header>
      <Popover.Body>
        <Nav.Link
          {...isActive(programRoutes.profile())}
          as={Link}
          onClick={closeMenu}
          className="text-dark p-0 user-popover-link"
          to={programRoutes.profile()}
        >
          <span className="pe-2">
            <BsHouseDoor />
          </span>

          <span>Profile</span>
        </Nav.Link>
        <Nav.Link
          {...isActive(programRoutes.settings())}
          as={Link}
          onClick={closeMenu}
          className="text-dark p-0 user-popover-link"
          to={programRoutes.settings()}
        >
          <span className="pe-2">
            <BsGear />
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
            <BsBoxArrowRight />
          </span>

          <span>Logout</span>
        </Nav.Link>
      </Popover.Body>
    </Popover>
  ) : null;

  return (
    <div className="navbar-container" style={{ zIndex: 100 }}>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="light"
        className="shadow"
      >
        <Container className="flex-row-reverse">
          {user && (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={userPopover}
            >
              <Button variant="white">
                {user.user_name.length > 18
                  ? `${user.user_name.substr(0, 15)}...`
                  : user.user_name}
                {" ▾"}
              </Button>
            </OverlayTrigger>
          )}
          <Navbar.Toggle
            ref={toggleButtonRef}
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {user && (
                <>
                  <Nav.Link
                    {...isActive(programRoutes.profile())}
                    as={Link}
                    onClick={closeMenu}
                    className="d-lg-none m-2 lead"
                    to={programRoutes.profile()}
                  >
                    overview
                  </Nav.Link>
                  <Nav.Link
                    {...isActive(programRoutes.indexAllExams())}
                    as={Link}
                    onClick={closeMenu}
                    className="d-lg-none m-2 lead"
                    to={programRoutes.indexAllExams()}
                  >
                    all exams
                  </Nav.Link>
                  <Nav.Link
                    {...isActive(programRoutes.indexCreatedExams())}
                    as={Link}
                    onClick={closeMenu}
                    className="d-lg-none m-2 lead"
                    to={programRoutes.indexCreatedExams()}
                  >
                    created exams
                  </Nav.Link>
                  <Nav.Link
                    {...isActive(programRoutes.createExam())}
                    as={Link}
                    onClick={closeMenu}
                    className="d-lg-none m-2 lead"
                    to={programRoutes.createExam()}
                  >
                    create new exam
                  </Nav.Link>
                  <Nav.Link
                    {...isActive(programRoutes.indexParticipatedExams())}
                    as={Link}
                    onClick={closeMenu}
                    className="d-lg-none m-2 lead"
                    to={programRoutes.indexParticipatedExams()}
                  >
                    participatedExams
                  </Nav.Link>
                  <Nav.Link
                    {...isActive(programRoutes.settings())}
                    as={Link}
                    onClick={closeMenu}
                    className="d-lg-none m-2 lead"
                    to={programRoutes.settings()}
                  >
                    settings
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {!user && (
                <>
                  <Nav.Link
                    {...isActive(programRoutes.login())}
                    className="m-2 lead"
                    as={Link}
                    to={programRoutes.login()}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    {...isActive(programRoutes.register())}
                    className="m-2 lead"
                    as={Link}
                    to={programRoutes.register()}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
