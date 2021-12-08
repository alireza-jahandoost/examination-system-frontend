import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import programRoutes from "../../../constants/program-routes.constant";

const ItemButton = ({ children }) => {
  return (
    <Link
      className="flex-grow-1 text-decoration-none d-flex"
      to={programRoutes.indexCreatedExams()}
    >
      <Button variant="success" className="flex-grow-1 m-2 p-3 fw-bold">
        {children}
      </Button>
    </Link>
  );
};

export default ItemButton;
