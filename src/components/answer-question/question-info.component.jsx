import { Container } from "react-bootstrap";

const QuestionInfo = ({ questionText, questionScore }) => {
  return (
    <Container>
      <p className="lead"> {questionText} </p>
      <p className="small">
        {" "}
        {`${questionScore} ${questionScore > 1 ? "points" : "point"}`}{" "}
      </p>
    </Container>
  );
};

export default QuestionInfo;
