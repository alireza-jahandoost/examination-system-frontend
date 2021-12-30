import { Container } from "react-bootstrap";

const ProfileContainer = ({ children, ...props }) => {
  return (
    <div {...props}>
      <div className="d-flex bg-white rounded shadow border flex-row w-100 flex-grow-1 pt-4">
        <Container className="text-center">
          <div className="flex-grow-1">{children}</div>
        </Container>
      </div>
    </div>
  );
};

export default ProfileContainer;
