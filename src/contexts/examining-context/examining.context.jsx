import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useMountedState } from "react-use";
import axios from "axios";

import { ExamInfoContext } from "../exam-info-context/exam-info.context";
import { AuthenticationContext } from "../authentication-context/authentication.context";

import { getCurrentParticipantRequest } from "../../services/participants/participants.service";
import { questionsIndexRequest } from "../../services/questions/questions.service";
import { finishExamRequest } from "../../services/participants/participants.service";

export const ExaminingContext = createContext();

export const ExaminingProvider = ({ children }) => {
  const examInfo = useContext(ExamInfoContext);
  const { token } = useContext(AuthenticationContext);

  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isUserFinishedExam, setIsUserFinishedExam] = useState(false);

  const isMounted = useMountedState();
  const { examId } = useParams();
  const { pathname } = useLocation();

  const questionId = isNaN(pathname.split("/").reverse()[0])
    ? undefined
    : pathname.split("/").reverse()[0];

  const currentQuestionIndex = useMemo(
    () =>
      questions.findIndex(
        (question) => Number(question.question_id) === Number(questionId)
      ),
    [questionId, questions]
  );
  const nextQuestionId = useMemo(() => {
    if (
      currentQuestionIndex === -1 ||
      currentQuestionIndex === questions.length - 1
    ) {
      return -1;
    }
    return Number(questions[currentQuestionIndex + 1].question_id);
  }, [currentQuestionIndex, questions]);
  const prevQuestionId = useMemo(() => {
    if (currentQuestionIndex === -1 || currentQuestionIndex === 0) {
      return -1;
    }
    return Number(questions[currentQuestionIndex - 1].question_id);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (isContextLoaded) {
      return;
    }
    if (examInfo.exam) {
      setIsContextLoaded(true);
    }
  }, [examInfo.exam, isContextLoaded]);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (!participant && examInfo.isUserRegisteredToExam && !isLoading) {
      const requests = [
        getCurrentParticipantRequest(examId, token),
        questionsIndexRequest(examId, token),
      ];
      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            if (isMounted()) {
              const currentParticipantResponse = responses[0];
              const questionsResponse = responses[1];

              const {
                participant: receivedParticipant,
              } = currentParticipantResponse.data.data;
              setParticipant(receivedParticipant);

              const {
                questions: receivedQuestions,
              } = questionsResponse.data.data;
              setQuestions(receivedQuestions);

              setIsLoading(false);
            }
          })
        )
        .catch((errors) => {
          // react on errors.
        });
    }
  }, [
    examInfo.isUserRegisteredToExam,
    isMounted,
    participant,
    examId,
    token,
    isLoading,
  ]);

  const finishExam = () => {
    setIsLoading(true);
    finishExamRequest(examId, token)
      .then(() => {
        setIsUserFinishedExam(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrors({ message: "something went wrong, please try again later" });
        setIsLoading(false);
      });
  };

  const value = {
    ...examInfo,
    isContextLoaded,
    participant,
    errors,
    isLoading,
    nextQuestion: nextQuestionId,
    prevQuestion: prevQuestionId,
    firstQuestion: questions[0] ? questions[0].question_id : null,
    isUserFinishedExam,
    finishExam,
  };

  return (
    <ExaminingContext.Provider value={value}>
      {children}
    </ExaminingContext.Provider>
  );
};