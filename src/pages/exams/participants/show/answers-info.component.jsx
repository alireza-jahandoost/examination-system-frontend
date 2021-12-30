import { useContext } from "react";
import { Container } from "react-bootstrap";

import ParticipantAnswer from "../../../../components/participant-answer/participant-answer.component";

import { ShowParticipantContext } from "../../../../contexts/show-participant-context/show-participant.context";
import { ExamInfoContext } from "../../../../contexts/exam-info-context/exam-info.context";

const AnswersInfo = ({ ...props }) => {
  const { participant, questions } = useContext(ShowParticipantContext);
  const examInfo = useContext(ExamInfoContext);

  return (
    <div {...props}>
      <Container className="bg-white p-3 border shadow rounded my-2">
        {examInfo.isContextLoaded ? (
          examInfo.examTime.isExamFinished ? (
            questions.map((question) => (
              <ParticipantAnswer
                key={question.question_id}
                participantId={participant.participant_id}
                examId={participant.exam_id}
                questionId={question.question_id}
                participantStatus={participant.status}
              />
            ))
          ) : (
            <p className="lead">
              You can see the answers when exam is finished
            </p>
          )
        ) : (
          "Loading..."
        )}
      </Container>
    </div>
  );
};

export default AnswersInfo;
