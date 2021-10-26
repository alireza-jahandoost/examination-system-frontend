import { Link } from "react-router-dom";

const PaginationItem = ({ to, disabled = false, active = false, children }) => {
  return (
    <li
      className={`page-item ${disabled ? "disabled" : ""} ${
        active ? "active" : ""
      }`}
    >
      {active ? (
        <a className="page-link"> {children}</a>
      ) : (
        <Link className="page-link" to={to}>
          {children}
        </Link>
      )}
    </li>
  );
};

export default PaginationItem;
