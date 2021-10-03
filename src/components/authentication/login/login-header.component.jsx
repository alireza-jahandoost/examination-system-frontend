import { Row, Col } from "react-bootstrap";
const LoginHeader = () => {
  return (
    <div>
      <Row>
        <Col>
          <p className="text-uppercase">easily create your custom exam</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-uppercase">
            <span>any problem? </span>
            <a href="#contactUs">contact us</a>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default LoginHeader;
