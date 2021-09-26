import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Search = (props) => {
  return (
    <div {...props} role="search">
      {" "}
      <Button>
        <FontAwesomeIcon icon={faSearch} />
      </Button>{" "}
    </div>
  );
};

export default Search;
