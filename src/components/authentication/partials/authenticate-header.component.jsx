import { Image, Row, Col } from "react-bootstrap";
const AuthenticateHeader = ({ ...props }) => {
  return (
    <div {...props}>
      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col xs={2} md={0} />
        <Col
          xs={8}
          md={12}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Image
            style={{ maxHeight: "75%" }}
            className="d-none d-md-inline w-100 float-start"
            src="./auth-image.jpg"
          />

          <h3
            style={{ fontSize: "min(3.5vw, 25px)" }}
            className="text-success text-center fw-light text-uppercase"
          >
            easily create your custom exam
          </h3>
        </Col>
        <Col xs={2} md={0} />
      </Row>
      <Row>
        <Col>
          <p
            style={{ fontSize: "min(2.5vw,15px)" }}
            className="text-uppercase text-center fw-light"
          >
            <span className="text-success">any problem? </span>
            <a href="#contactUs">
              <em>contact us</em>
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default AuthenticateHeader;
