import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMountedState } from "react-use";
import { AuthenticationContext } from "../authentication-context/authentication.context";

import { showParticipantRequest } from "../../services/participants/participants.service";
import { questionsIndexRequest } from "../../services/questions/questions.service";

export const ShowParticipantContext = createContext();

export const ShowParticipantProvider = ({ children }) => {
  const { examId, participantId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();

  useEffect(() => {
    if (
      !examId ||
      isNaN(participantId) ||
      isNaN(examId) ||
      !token ||
      isContextLoaded
    ) {
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

            setIsContextLoaded(true);
          }
        })
      )
      .catch((err) => {
        console.error(err);
      });
  }, [examId, token, isMounted, participantId, isContextLoaded]);

  const value = {
    questions,
    participant,
    isContextLoaded,
  };

  return (
    <ShowParticipantContext.Provider value={value}>
      {children}
    </ShowParticipantContext.Provider>
  );
};
