import { useContext } from "react";
import { ExaminingContext } from "../../../../contexts/examining-context/examining.context";
import { AnswerQuestionProvider } from "../../../../contexts/answer-question-context/answer-question.context";
import AnswerQuestion from "../../../../components/answer-question/answer-question.component";

const ExamQuestionPage = () => {
  const { isContextLoaded } = useContext(ExaminingContext);

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
    </div>
  );
};

export default ExamQuestionPage;
