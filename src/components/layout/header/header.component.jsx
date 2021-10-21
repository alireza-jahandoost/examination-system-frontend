import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";
import LoginPopover from "./login-popover.component";
import RegisterPopover from "./register-popover.component";
import programRoutes from "../../../constants/program-routes.constant";

const Header = () => {
  const { user, popover, changePopover } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user && popover !== "") {
      changePopover("");
    }
  }, [user, popover, changePopover]);

  return (
    <div style={{ paddingBottom: "56px" }}>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <div role="banner">
            <Navbar.Brand as={Link} title="Visit the main page" to="/">
              React-Bootstrap
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={programRoutes.indexAllExams()}>
                Exams
              </Nav.Link>
              <Nav.Link as={Link} to={programRoutes.aboutUs()}>
                About us
              </Nav.Link>
              <Nav.Link as={Link} to={programRoutes.contactUs()}>
                Contact us
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to={programRoutes.profile()}>
                    Profile
                  </Nav.Link>
                  <Nav.Link role="button">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => changePopover("login")}
                    role="button"
                    title="see login popover"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => changePopover("register")}
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
      {popover === "login" && <LoginPopover />}
      {popover === "register" && <RegisterPopover />}
    </div>
  );
};

export default Header;
