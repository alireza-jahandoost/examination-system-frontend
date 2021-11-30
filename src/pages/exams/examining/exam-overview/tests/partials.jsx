import { Route } from "react-router-dom";
import { ExaminingContext } from "../../../../../contexts/examining-context/examining.context";
import programRoutes from "../../../../../constants/program-routes.constant";
import {
  showParticipantId1,
  showParticipantId2,
  showParticipantId3,
} from "../../../../../mocks/mocks/participants.mock";
import {
  examShowId_1,
  examShowId_5_withPassword,
} from "../../../../../mocks/mocks/exams.mock";

const getExam = (examId) => {
  let exam;
  switch (examId) {
    case 1:
      exam = examShowId_1;
      break;
    case 5:
      exam = examShowId_5_withPassword;
      break;
    default:
      throw new Error("examId is not expected in partials in exam overview");
  }
  return exam.data.exam;
};

const getParticipant = (participantId) => {
  let participant;
  switch (participantId) {
    case 0:
      return null;
    case 1:
      participant = showParticipantId1;
      break;
    case 2:
      participant = showParticipantId2;
      break;
    case 3:
      participant = showParticipantId3;
      break;
    default:
      throw new Error("participant id is not valid in exam question partials");
  }
  return participant.data.participant;
};

export const wrapper = (
  ui,
  {
    isContextLoaded = true,
    participantId = 1,
    nextQuestion = -1,
    prevQuestion = -1,
    finishExam = jest.fn(),
    examTime = {
      isExamStarted: true,
      isExamFinished: false,
      examTimeDuration: { seconds: 10, minutes: 10, hours: 10, days: 0 },
      seconds: 1,
      minutes: 1,
      hours: 1,
      days: 0,
    },
    isUserFinishedExam = false,
    examId = 1,
    firstQuestion = 1,
    registerToExam = jest.fn(),
    changeExamPassword = jest.fn(),
    examPassword = "",
    passwordErrorMessage = "",
    errors = {},
  }
) => {
  if (passwordErrorMessage) {
    throw new Error("here");
  }
  const value = {
    isContextLoaded,
    participant: getParticipant(participantId),
    nextQuestion,
    prevQuestion,
    examTime,
    finishExam,
    isUserFinishedExam,
    exam: getExam(examId),
    firstQuestion,
    registerToExam,
    changeExamPassword,
    examPassword,
    passwordErrorMessage,
    errors,
  };
  const WrappedElement = (
    <Route path={programRoutes.examiningOverview(":examId")}>
      <ExaminingContext.Provider value={value}>{ui}</ExaminingContext.Provider>
    </Route>
  );
  return { WrappedElement, value };
};
