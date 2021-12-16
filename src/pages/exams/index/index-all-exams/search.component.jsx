import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const Search = ({ value, changeValue, handleClick }) => {
  return (
    <Row>
      <Col lg={2}></Col>
      <Col lg={8}>
        <InputGroup size="lg" role="search" className="mb-3">
          <FormControl
            placeholder="Search Exam"
            aria-label="search-exam"
            aria-describedby="search-exam"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
          />
          <Button
            onClick={handleClick}
            variant="outline-secondary"
            title="search exam"
            id="search-exam"
          >
            <BsSearch />
          </Button>
        </InputGroup>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
};

export default Search;
