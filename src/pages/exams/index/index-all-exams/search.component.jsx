import {
  InputGroup,
  Form,
  Button,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const Search = ({ value, changeValue, handleClick }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <Row>
      <Col lg={2}></Col>
      <Col lg={8}>
        <Form onSubmit={handleSubmit}>
          <InputGroup size="lg" role="search" className="mb-3">
            <FormControl
              className="rounded-pill"
              placeholder="Search Exam"
              aria-label="search-exam"
              aria-describedby="search-exam"
              value={value}
              onChange={(e) => changeValue(e.target.value)}
            />
            <Button
              type="submit"
              title="search exam"
              id="search-exam"
              variant="muted"
            >
              <BsSearch />
            </Button>
          </InputGroup>
        </Form>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
};

export default Search;
