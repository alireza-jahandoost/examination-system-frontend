import { Form } from "react-bootstrap";

const PasswordInput = ({ examId }) => {
  return (
    <Form.Group controlId={`exam-${examId}-register`}>
      <Form.Control
        aria-label="Exam Password"
        size="lg"
        type="password"
        placeholder="Exam Password"
      />
      <small>
        This is a private exam and requires password. if you don't know the
        password, contact the auther
      </small>
    </Form.Group>
  );
};

export default PasswordInput;
