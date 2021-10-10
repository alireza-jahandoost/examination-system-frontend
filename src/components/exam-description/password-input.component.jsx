import { Form } from "react-bootstrap";
import { useContext } from "react";
import { ExamInfoContext } from "../../contexts/exam-info-context/exam-info.context";

const PasswordInput = ({ examId }) => {
  const { examPassword, changeExamPassword, passwordErrorMessage } = useContext(
    ExamInfoContext
  );
  return (
    <Form.Group controlId={`exam-${examId}-register`}>
      <Form.Control
        value={examPassword}
        onChange={(e) => changeExamPassword(e.target.value)}
        aria-label="Exam Password"
        size="lg"
        type="password"
        placeholder="Exam Password"
      />
      <small className="text-danger">{passwordErrorMessage}</small>
      <small>
        This is a private exam and requires password. if you don't know the
        password, contact the auther
      </small>
    </Form.Group>
  );
};

export default PasswordInput;
