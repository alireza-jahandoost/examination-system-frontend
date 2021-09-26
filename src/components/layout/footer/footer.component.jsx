import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid={true} className="bg-dark text-muted px-5 pt-5 pb-3">
      <Container>
        <Row>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <a
                href="#main"
                title="Visit the main page"
                className="btn btn-secondary mb-5"
              >
                React-Bootstrap
              </a>
            </div>
          </Col>
          <Col lg={3} className="d-flex justify-content-center">
            <div className="mt-4">
              <h4>
                <a className="text-muted text-decoration-none" href="#exams">
                  Exams
                </a>
              </h4>
              <Row>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={3} className="d-flex justify-content-center">
            <div className="mt-4">
              <h4>
                <a className="text-muted text-decoration-none" href="#aboutUs">
                  About us
                </a>
              </h4>
              <Row>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={3} className="d-flex justify-content-center">
            <div className="mt-4">
              <h4>
                <a
                  className="text-muted text-decoration-none"
                  href="#contactUs"
                >
                  Contact us
                </a>
              </h4>
              <Row>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
                <Col xs={6} lg={12}>
                  <p className="mt-lg-4 mt-ms-3">body body</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center pt-4" xs={12} lg={3}>
            <p>© 2021 Examinator, Inc.</p>
          </Col>
          <Col xs={0} lg={9}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
