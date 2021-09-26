import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <Row>
      <Col lg={2}></Col>
      <Col lg={8}>
        {" "}
        <InputGroup size="lg" role="search" className="mb-3">
          <FormControl
            placeholder="Search Exam"
            aria-label="search-exam"
            aria-describedby="search-exam"
          />
          <Button variant="outline-secondary" id="search-exam">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
};

export default Search;
