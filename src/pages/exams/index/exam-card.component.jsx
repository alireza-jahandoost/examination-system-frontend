import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

const ExamCard = ({ title }) => {
  return (
    <Card className="mb-2 bg-light" style={{ height: 600 }}>
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
      <Card.Img style={{ height: 250 }} variant="top" src="./Exam.jpeg" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Row>
          <Col xs={6} className="d-flex justify-content-start">
            <Button variant="secondary">register</Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-end align-items-center">
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faShareAlt} />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ExamCard;
