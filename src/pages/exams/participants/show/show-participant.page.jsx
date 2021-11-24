import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMountedState } from "react-use";

import Sidebar from "../../../../components/sidebar/sidebar.component";
import ParticipantAnswer from "../../../../components/participant-answer/participant-answer.component";

import { AuthenticationContext } from "../../../../contexts/authentication-context/authentication.context";

import { questionsIndexRequest } from "../../../../services/questions/questions.service";
import { showParticipantRequest } from "../../../../services/participants/participants.service";

const ShowParticipantPage = () => {
  const { examId, participantId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [participant, setParticipant] = useState(null);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();

  useEffect(() => {
    if (!examId || isNaN(participantId) || isNaN(examId) || !token) {
      return;
    }
    const requests = [
      showParticipantRequest(examId, participantId, token),
      questionsIndexRequest(examId, token),
    ];
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            const participantResponse = responses[0];
            const questionsResponse = responses[1];

            const {
              participant: receivedParticipant,
            } = participantResponse.data.data;
            setParticipant(receivedParticipant);

            const {
              questions: receivedQuestions,
            } = questionsResponse.data.data;
            setQuestions(receivedQuestions);
          }
        })
      )
      .catch((err) => {
        console.error(err);
      });
  }, [examId, token, isMounted, participantId]);

  if (!participant) {
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
                participantId={participantId}
                examId={examId}
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

export default ShowParticipantPage;
