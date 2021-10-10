import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { ExamInfoContext } from "../../contexts/exam-info-context/exam-info.context";

const RegisterToExamButton = ({ ...props }) => {
  const { exam, canUserRegister, registerToExam } = useContext(ExamInfoContext);
  if (canUserRegister !== true && canUserRegister !== false) {
    console.log(
      "we have an issue here",
      typeof canUserRegister,
      canUserRegister
    );
  }
  return (
    <Button
      {...props}
      type="submit"
      disabled={canUserRegister === false}
      title={`register to exam "${exam.exam_name}"`}
      onClick={registerToExam}
    >
      Register
    </Button>
  );
};

export default RegisterToExamButton;
