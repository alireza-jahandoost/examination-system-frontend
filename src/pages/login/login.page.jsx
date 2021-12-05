import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Redirect, useLocation } from "react-router-dom";
import LoginForm from "../../components/authentication/login/login-form.component";
import AuthenticateHeader from "../../components/authentication/partials/authenticate-header.component";
import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";
import Brand from "../../components/brand/brand.component";
import { getParams } from "../../utilities/url.utility";
import programRoutes from "../../constants/program-routes.constant";

const LoginPage = () => {
  const { isUserAuthenticated } = useContext(AuthenticationContext);
  const location = useLocation();

  if (isUserAuthenticated) {
    const redirect = getParams({ url: location.search }).redirect;

    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return <Redirect to={programRoutes.profile()} />;
  }

  return (
    <div className="h-100">
      <Row className="h-100 flex-column flex-md-row">
        <Col xs={12} md={6} lg={8}>
          <AuthenticateHeader />
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
                <Link to={programRoutes.register()}>
                  <button className="text-uppercase text-decoration-none border-0 bg-transparent text-primary fst-italic">
                    sign up
                  </button>
                </Link>
              </small>
            </p>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
