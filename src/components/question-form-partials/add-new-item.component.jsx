import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const AddNewItem = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children}
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
};

export default AddNewItem;
