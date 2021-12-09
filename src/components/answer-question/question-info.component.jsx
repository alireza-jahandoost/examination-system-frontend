import { Container } from "react-bootstrap";

const QuestionInfo = ({ questionText, questionScore, questionInput }) => {
  let firstPart = questionText,
    secondPart = "";
  if (questionInput) {
    [firstPart, secondPart] = questionText.split("{{{}}}");
  }
  return (
    <Container>
      <div className="lead">
        <span>{firstPart}</span>
        {questionInput}
        <span>{secondPart}</span>
      </div>
      <p className="small">
        {`${questionScore} ${questionScore > 1 ? "points" : "point"}`}
      </p>
    </Container>
  );
};

export default QuestionInfo;
