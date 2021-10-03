import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "./login-form.component";
import LoginHeader from "./login-header.component";
import Brand from "../../brand/brand.component";

const Login = () => {
  return (
    <div className="h-100">
      <Row className="h-100 flex-column flex-md-row">
        <Col xs={12} md={6} lg={8}>
          <Container
            fluid
            className="h-100"
            style={{ backgroundColor: "#c2ebdb" }}
          >
            <LoginHeader className="p-3 p-md-0 h-100" />
          </Container>
        </Col>
        <Col className="order-md-first flex-fill" xs={12} md={6} lg={4}>
          <Container className="h-100 d-flex justify-content-around flex-column align-items-around">
            <Brand
              style={{ flexGrow: 1 }}
              className="d-flex justify-content-center align-items-center"
            />
            <LoginForm style={{ flexGrow: 3 }} />
            <p style={{ flexGrow: 1 }} className="fw-light text-center">
              <small>
                <span className="text-uppercase">dont have an account? </span>
                <a
                  href="#signUp"
                  className="text-uppercase text-decoration-none"
                >
                  sign up
                </a>
              </small>
            </p>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
