import { Table } from "react-bootstrap";

const RecordsTable = ({ children }) => {
  return (
    <Table striped bordered hover className="bg-light shadow">
      {children}
    </Table>
  );
};

export default RecordsTable;
