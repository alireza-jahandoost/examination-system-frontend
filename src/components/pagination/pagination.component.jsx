import { Pagination } from "react-bootstrap";
import PaginationItem from "./pagination-item.component";

const PaginationComponent = ({
  prefix,
  currentPage,
  numberOfPages,
  rangeSize = 3,
}) => {
  const prevPagesButtons = [];
  for (let i = Math.max(currentPage - rangeSize, 1); i < currentPage; i++) {
    prevPagesButtons.push(
      <PaginationItem to={`${prefix}?page=${i}`} key={i}>
        {i}
      </PaginationItem>
    );
  }
  const nextPagesButtons = [];
  for (
    let i = currentPage + 1;
    i <= Math.min(numberOfPages, currentPage + rangeSize);
    i++
  ) {
    nextPagesButtons.push(
      <PaginationItem to={`${prefix}?page=${i}`} key={i}>
        {i}
      </PaginationItem>
    );
  }
  return (
    <>
      <Pagination>
        <PaginationItem to={`${prefix}?page=${1}`} disabled={currentPage === 1}>
          <span aria-hidden="true">«</span>
          <span className="visually-hidden">First</span>
        </PaginationItem>
        <PaginationItem
          disabled={currentPage === 1}
          to={`${prefix}?page=${currentPage - 1}`}
        >
          <span aria-hidden="true">‹</span>
          <span className="visually-hidden">Previous</span>
        </PaginationItem>
        {prevPagesButtons}
        <PaginationItem active={true}>{currentPage}</PaginationItem>
        {nextPagesButtons}
        <PaginationItem
          to={`${prefix}?page=${currentPage + 1}`}
          disabled={currentPage === numberOfPages}
        >
          <span aria-hidden="true">›</span>
          <span className="visually-hidden">Next</span>
        </PaginationItem>
        <PaginationItem
          to={`${prefix}?page=${numberOfPages}`}
          disabled={currentPage === numberOfPages}
        >
          <span aria-hidden="true">»</span>
          <span className="visually-hidden">Last</span>
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default PaginationComponent;
