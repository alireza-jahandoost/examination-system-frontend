import { Container } from "react-bootstrap";
import ItemButton from "./item-button.component";

const OverviewPage = () => {
  return (
    <>
      <Container>
        <div className="bg-light m-3 p-3 shadow border rounded">
          <div className="d-flex flex-wrap">
            <ItemButton>Created Exams</ItemButton>
            <ItemButton>Participated Exams</ItemButton>
            <ItemButton>Settings</ItemButton>
            <ItemButton>Create New Exam</ItemButton>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OverviewPage;
