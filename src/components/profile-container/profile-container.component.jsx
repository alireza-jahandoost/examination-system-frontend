import { Container } from "react-bootstrap";
import Sidebar from "../sidebar/sidebar.component";

const ProfileContainer = ({ children }) => {
  return (
    <div className="d-flex flex-row w-100">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">{children}</div>
      </Container>
    </div>
  );
};

export default ProfileContainer;
