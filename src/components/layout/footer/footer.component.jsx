import { Container, Row, Col } from "react-bootstrap";
import { BsInstagram, BsTelegram, BsTwitter } from "react-icons/bs";
import "./icons.style.css";

const Footer = () => {
  return (
    <footer>
      <Container
        id="footer"
        data-testid="footer"
        fluid={true}
        className="bg-dark text-muted px-5 pt-5"
      >
        <Container>
          <Row>
            <Col xs={12}>
              <p className="text-center lead">Follow us on social media</p>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <div className="mx-3">
                  <a
                    href="#"
                    className={`rounded-circle text-muted p-2 twitter`}
                  >
                    <BsTwitter />
                  </a>
                </div>
                <div className="mx-3">
                  <a
                    href="#"
                    className={`rounded-circle text-muted p-2 instagram`}
                  >
                    <BsInstagram />
                  </a>
                </div>
                <div className="mx-3">
                  <a
                    href="#"
                    className={`rounded-circle text-muted p-2 telegram`}
                  >
                    <BsTelegram />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center pt-4">
              <p>© 2021 Examinator, Inc.</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
