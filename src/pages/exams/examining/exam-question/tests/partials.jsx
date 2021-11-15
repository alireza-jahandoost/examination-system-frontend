import { Route } from "react-router-dom";
import { ExaminingContext } from "../../../../../contexts/examining-context/examining.context";
import programRoutes from "../../../../../constants/program-routes.constant";
import {
  showParticipantId1,
  showParticipantId2,
} from "../../../../../mocks/mocks/participants.mock";

const getParticipant = (participantId) => {
  let participant;
  switch (participantId) {
    case 1:
      participant = showParticipantId1;
      break;
    case 2:
      participant = showParticipantId2;
      break;
    default:
      throw new Error("participant id is not valid in exam question partials");
  }
  return participant.data.participant;
};

export const wrapper = (ui, { isContextLoaded = true, participantId = 1 }) => {
  const value = { isContextLoaded, participant: getParticipant(participantId) };
  const WrappedElement = (
    <Route path={programRoutes.examiningQuestion(":examId", ":questionId")}>
      <ExaminingContext.Provider value={value}>{ui}</ExaminingContext.Provider>
    </Route>
  );
  return { WrappedElement };
};
