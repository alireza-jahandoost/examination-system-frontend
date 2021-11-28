import { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";
import { useMountedState } from "react-use";

import { AuthenticationContext } from "../authentication-context/authentication.context";

import { questionsShowRequest } from "../../services/questions/questions.service";
import {
  indexAnswersRequest,
  deleteAnswersRequest,
  storeAnswerRequest,
} from "../../services/answers/answers.service";
import { statesIndexRequest } from "../../services/states/states.service";

import { questionNeedsState } from "../../utilities/question-form-parts.utility";

export const AnswerQuestionContext = createContext();

export const AnswerQuestionProvider = ({
  children,
  questionId,
  examId,
  participantId,
}) => {
  const [answers, setAnswers] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [isFailed, setIsFailed] = useState(false);
  const isMounted = useMountedState();

  useEffect(() => {
    if (!question || question.question_id !== questionId) {
      setIsContextLoaded(false);
    }
  }, [questionId, question]);

  useEffect(() => {
    if (
      isFailed ||
      !token ||
      !examId ||
      !questionId ||
      !participantId ||
      isContextLoaded ||
      isLoading ||
      (question && Number(question.question_id) === Number(questionId))
    ) {
      return;
    }
    setIsLoading(true);
    const requests = [
      questionsShowRequest(examId, questionId, token),
      indexAnswersRequest(questionId, participantId, token),
    ];

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            const questionsShowResponse = responses[0];

            const indexAnswersResponse = responses[1];

            const { answers: receivedAnswers } = indexAnswersResponse.data.data;
            setAnswers(receivedAnswers);
            setCurrentAnswers(receivedAnswers);

            const {
              question: receivedQuestion,
            } = questionsShowResponse.data.data;
            setQuestion(receivedQuestion);

            if (questionNeedsState(receivedQuestion)) {
              return statesIndexRequest(examId, questionId, token);
            }
          }
        })
      )
      .then((response) => {
        if (isMounted()) {
          if (response) {
            const { states: receivedStates } = response.data.data;
            setStates(receivedStates);
          }
          setIsLoading(false);
          setIsContextLoaded(true);
        }
      })
      .catch((e) => {
        if (isMounted()) {
          switch (Number(e.response.status)) {
            case 401:
              setIsFailed(true);
              removeUserInfo();
              break;
            default:
              setErrors({
                message: "something went wrong, please try again later",
              });
          }
          setIsLoading(false);
        }
      });
  }, [
    examId,
    participantId,
    questionId,
    token,
    question,
    answers,
    isMounted,
    states,
    isContextLoaded,
    isLoading,
    isFailed,
    removeUserInfo,
  ]);

  const changeAnswers = (newAnswers) => {
    setCurrentAnswers(newAnswers);
  };

  const updateAnswers = () => {
    if (!questionId || !token) {
      return;
    }
    setIsLoading(true);
    deleteAnswersRequest(questionId, token)
      .then(() => {
        const requests = currentAnswers.map((answer) => {
          const bodyOfRequest = {};
          if (answer.text_part !== undefined && answer.text_part !== null) {
            bodyOfRequest.text_part = answer.text_part;
          }
          if (
            answer.integer_part !== undefined &&
            answer.integer_part !== null
          ) {
            bodyOfRequest.integer_part = answer.integer_part;
          }
          return storeAnswerRequest(questionId, bodyOfRequest, token);
        });
        return axios.all(requests);
      })
      .then(() => {
        if (isMounted()) {
          setAnswers(currentAnswers);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted()) {
          switch (Number(err.response.status)) {
            case 401:
              removeUserInfo();
              break;
            default:
              setErrors({
                message: "something went wrong, please try again later",
              });
          }
          setIsLoading(false);
        }
      });
  };

  const value = {
    hasChange: JSON.stringify(answers) !== JSON.stringify(currentAnswers),
    question,
    isContextLoaded,
    isLoading,
    errors,
    answers: currentAnswers,
    changeAnswers,
    updateAnswers,
    states,
  };

  return (
    <AnswerQuestionContext.Provider value={value}>
      {children}
    </AnswerQuestionContext.Provider>
  );
};
