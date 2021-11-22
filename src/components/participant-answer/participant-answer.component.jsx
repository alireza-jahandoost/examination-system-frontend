import AnswerQuestion from "../answer-question/answer-question.component";
import { AnswerQuestionProvider } from "../../contexts/answer-question-context/answer-question.context";

const ParticipantAnswer = ({ questionId, examId, participantId }) => {
  return (
    <div>
      <AnswerQuestionProvider
        questionId={questionId}
        examId={examId}
        participantId={participantId}
      >
        <AnswerQuestion readOnly={true} />
      </AnswerQuestionProvider>
    </div>
  );
};

export default ParticipantAnswer;
