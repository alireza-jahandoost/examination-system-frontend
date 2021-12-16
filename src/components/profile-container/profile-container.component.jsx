import { Container } from "react-bootstrap";

const ProfileContainer = ({ children }) => {
  return (
    <div className="d-flex flex-row w-100 flex-grow-1 mt-4">
      <Container className="text-center">
        <div className="flex-grow-1">{children}</div>
      </Container>
    </div>
  );
};

export default ProfileContainer;
