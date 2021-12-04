import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileContainer from "../../../components/profile-container/profile-container.component";
import programRoutes from "../../../constants/program-routes.constant";
const OverviewPage = () => {
  return (
    <ProfileContainer>
      <h1>Profile Overview</h1>
      <Container>
        <div className="bg-light m-3 p-3 border rounded">
          <div className="d-flex justify-content-between">
            <Link to={programRoutes.indexCreatedExams()}>
              <Button variant="success" className="p-3 fw-bold">
                Created Exams
              </Button>
            </Link>
            <Link to={programRoutes.indexParticipatedExams()}>
              <Button variant="success" className="p-3 fw-bold">
                Participated Exams
              </Button>
            </Link>
            <Link to={programRoutes.settings()}>
              <Button variant="success" className="p-3 fw-bold">
                Settings
              </Button>
            </Link>
            <Link to={programRoutes.createExam()}>
              <Button variant="success" className="p-3 fw-bold">
                Create New Exam
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </ProfileContainer>
  );
};

export default OverviewPage;
