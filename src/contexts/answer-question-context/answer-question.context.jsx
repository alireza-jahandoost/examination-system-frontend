import { useEffect, createContext, useMemo, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMountedState } from "react-use";

import { AuthenticationContext } from "../authentication-context/authentication.context";
import { ExaminingContext } from "../examining-context/examining.context";

import { questionsShowRequest } from "../../services/questions/questions.service";
import {
  indexAnswersRequest,
  deleteAnswersRequest,
  storeAnswerRequest,
} from "../../services/answers/answers.service";

export const AnswerQuestionContext = createContext();

export const AnswerQuestionProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const { examId, questionId } = useParams();
  const { token } = useContext(AuthenticationContext);
  const { participant } = useContext(ExaminingContext);
  const [errors, setErrors] = useState({});
  const isMounted = useMountedState();

  useEffect(() => {
    if (
      !token ||
      !examId ||
      !questionId ||
      !participant ||
      question ||
      answers.length > 0
    ) {
      return;
    }
    const requests = [
      questionsShowRequest(examId, questionId, token),
      indexAnswersRequest(questionId, participant.participant_id, token),
    ];

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            const questionsShowResponse = responses[0];

            const indexAnswersResponse = responses[1];

            const {
              question: receivedQuestion,
            } = questionsShowResponse.data.data;
            setQuestion(receivedQuestion);

            const { answers: receivedAnswers } = indexAnswersResponse.data.data;
            setAnswers(receivedAnswers);
            setCurrentAnswers(receivedAnswers);

            setIsContextLoaded(true);
          }
        })
      )
      .catch((errors) => {
        if (isMounted()) {
          setErrors({
            message: "something went wrong, please try again later",
          });
        }
      });
  }, [examId, participant, questionId, token, question, answers, isMounted]);

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
          setErrors({
            message: "something went wrong, please try again later",
          });
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
  };

  return (
    <AnswerQuestionContext.Provider value={value}>
      {children}
    </AnswerQuestionContext.Provider>
  );
};
