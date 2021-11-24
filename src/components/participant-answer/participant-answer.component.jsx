import AnswerQuestion from "../answer-question/answer-question.component";
import QuestionGrade from "../question-grade/question-grade.component";
import { Container } from "react-bootstrap";

import { AnswerQuestionProvider } from "../../contexts/answer-question-context/answer-question.context";
import { QuestionGradeProvider } from "../../contexts/question-grade-context/question-grade.context";

const ParticipantAnswer = ({
  questionId,
  examId,
  participantId,
  participantStatus,
}) => {
  return (
    <div className="border rounded p-2 my-4 text-start">
      <Container className=" border-bottom">
        <h4> Question Text: </h4>
        <AnswerQuestionProvider
          questionId={questionId}
          examId={examId}
          participantId={participantId}
        >
          <AnswerQuestion readOnly={true} />
        </AnswerQuestionProvider>
      </Container>
      <Container>
        <h4> Grade Info: </h4>
        <QuestionGradeProvider
          participantId={participantId}
          questionId={questionId}
          participantStatus={participantStatus}
        >
          <QuestionGrade questionId={questionId} canUserChangeGrade={true} />
        </QuestionGradeProvider>
      </Container>
    </div>
  );
};

export default ParticipantAnswer;
