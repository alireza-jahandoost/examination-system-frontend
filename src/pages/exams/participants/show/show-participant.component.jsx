import { useContext } from "react";
import { Container } from "react-bootstrap";

import Sidebar from "../../../../components/sidebar/sidebar.component";
import ParticipantAnswer from "../../../../components/participant-answer/participant-answer.component";

import { ShowParticipantContext } from "../../../../contexts/show-participant-context/show-participant.context";

const ShowParticipant = () => {
  const { participant, questions, isContextLoaded } = useContext(
    ShowParticipantContext
  );

  if (!isContextLoaded) {
    return <p> Loading... </p>;
  }

  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <Container className="text-center">
        <div className="flex-grow-1">
          <h1>Participant Answers</h1>
          <div>
            <p className="lead"> status: {participant.status} </p>
            {participant.grade !== null && (
              <p className="lead"> grade: {participant.grade} </p>
            )}
          </div>
          <div>
            {questions.map((question) => (
              <ParticipantAnswer
                key={question.question_id}
                participantId={participant.participant_id}
                examId={participant.exam_id}
                questionId={question.question_id}
                participantStatus={participant.status}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShowParticipant;
