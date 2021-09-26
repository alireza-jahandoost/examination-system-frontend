import { Navbar, Container, Nav } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import breakpoints from "../../../constants/breakpoints.constant";

import Search from "./search.component";
const Header = () => {
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

              <Nav.Link href="#login">Login</Nav.Link>
              <Nav.Link href="#register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
