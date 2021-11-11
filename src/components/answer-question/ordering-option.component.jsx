import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const OrderingOption = ({ state, downDisabled, upDisabled, onUp, onDown }) => {
  return (
    <ListGroup.Item as="li">
      <span> {state.text_part} </span>
      <Button
        title="move this item down"
        disabled={downDisabled}
        onClick={onDown}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </Button>
      <Button title="move this item up" disabled={upDisabled} onClick={onUp}>
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
    </ListGroup.Item>
  );
};

export default OrderingOption;
