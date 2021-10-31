import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const DeleteButton = ({ ...props }) => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </Button>
  );
};

export default DeleteButton;
