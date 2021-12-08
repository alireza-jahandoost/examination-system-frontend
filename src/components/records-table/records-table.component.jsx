import { Table } from "react-bootstrap";

const RecordsTable = ({ children }) => {
  return (
    <Table responsive striped bordered hover className="bg-light shadow">
      {children}
    </Table>
  );
};

export default RecordsTable;
