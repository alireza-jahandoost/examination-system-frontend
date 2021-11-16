import PasswordInput from "../inputs/password-input.component";

const ExamPassword = ({
  examId,
  examPassword,
  changeExamPassword,
  passwordErrorMessage,
}) => {
  return (
    <div>
      <PasswordInput
        error={passwordErrorMessage}
        label="Exam Password"
        value={examPassword}
        id={`exam-password-field-${examId}`}
        placeholder="Enter the Password"
        onChange={(e) => changeExamPassword(e.target.value)}
      />
      <small>
        This is a private exam and requires password. if you don't know the
        password, contact the auther
      </small>
    </div>
  );
};

export default ExamPassword;
