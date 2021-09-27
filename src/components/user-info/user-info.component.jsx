import { Row, Col, Image } from "react-bootstrap";

const UserInfo = () => {
  return (
    <Row className="p-3">
      <Col xs={3} className="d-flex justify-content-center">
        <Image
          style={{ width: 50, height: 50 }}
          src="./user.jpeg"
          roundedCircle
        />
      </Col>
      <Col xs={9}>
        <p className="fs-4">Just Test</p>
      </Col>
    </Row>
  );
};

export default UserInfo;
