import { Table } from "react-bootstrap";

const RecordsTable = ({ children }) => {
  return (
    <Table striped bordered hover>
      {children}
    </Table>
  );
};

export default RecordsTable;
