import { Alert } from "react-bootstrap";

const NotificationAlert = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default NotificationAlert;
