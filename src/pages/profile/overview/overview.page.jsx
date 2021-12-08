import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileContainer from "../../../components/profile-container/profile-container.component";
import ItemButton from "./item-button.component";
import programRoutes from "../../../constants/program-routes.constant";
const OverviewPage = () => {
  return (
    <ProfileContainer>
      <h1>Profile Overview</h1>
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
    </ProfileContainer>
  );
};

export default OverviewPage;
