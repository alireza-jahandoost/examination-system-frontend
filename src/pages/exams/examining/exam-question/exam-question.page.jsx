import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import { ExaminingContext } from "../../../../contexts/examining-context/examining.context";
import { AnswerQuestionProvider } from "../../../../contexts/answer-question-context/answer-question.context";
import AnswerQuestion from "../../../../components/answer-question/answer-question.component";
import programRoutes from "../../../../constants/program-routes.constant";

const ExamQuestionPage = () => {
  const { isContextLoaded, nextQuestion, prevQuestion } = useContext(
    ExaminingContext
  );
  const { examId } = useParams();

  if (!isContextLoaded) {
    return <p> Loading... </p>;
  }

  return (
    <div>
      <div>
        <AnswerQuestionProvider>
          <AnswerQuestion />
        </AnswerQuestionProvider>
      </div>
      <div>
        <Link to={programRoutes.examiningQuestion(examId, nextQuestion)}>
          <Button disabled={nextQuestion === -1}>Next</Button>
        </Link>
        <Link to={programRoutes.examiningQuestion(examId, prevQuestion)}>
          <Button disabled={prevQuestion === -1}>Previous</Button>
        </Link>
      </div>
    </div>
  );
};

export default ExamQuestionPage;
