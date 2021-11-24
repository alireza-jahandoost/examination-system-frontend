import AnswerQuestion from "../answer-question/answer-question.component";
import QuestionGrade from "../question-grade/question-grade.component";

import { AnswerQuestionProvider } from "../../contexts/answer-question-context/answer-question.context";
import { QuestionGradeProvider } from "../../contexts/question-grade-context/question-grade.context";

const ParticipantAnswer = ({
  questionId,
  examId,
  participantId,
  participantStatus,
}) => {
  return (
    <div>
      <AnswerQuestionProvider
        questionId={questionId}
        examId={examId}
        participantId={participantId}
      >
        <AnswerQuestion readOnly={true} />
      </AnswerQuestionProvider>
      <QuestionGradeProvider
        participantId={participantId}
        questionId={questionId}
        participantStatus={participantStatus}
      >
        <QuestionGrade canUserChangeGrade={true} />
      </QuestionGradeProvider>
    </div>
  );
};

export default ParticipantAnswer;
