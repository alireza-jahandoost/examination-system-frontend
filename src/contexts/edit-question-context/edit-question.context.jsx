import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useMountedState } from "react-use";

import { AuthenticationContext } from "../authentication-context/authentication.context";

import {
  questionsShowRequest,
  questionsUpdateRequest,
  questionsDeleteRequest,
} from "../../services/questions/questions.service";

import {
  statesIndexRequest,
  statesDeleteRequest,
  statesUpdateRequest,
  statesStoreRequest,
} from "../../services/states/states.service";

import useAsyncError from "../../hooks/useAsyncError";

export const EditQuestionContext = createContext();

export const EditQuestionProvider = ({ children, examId, questionId }) => {
  const [question, setQuestion] = useState(null);
  const [states, setStates] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const { token, removeUserInfo } = useContext(AuthenticationContext);
  const isMounted = useMountedState();
  const throwError = useAsyncError();

  const addError = (newErrors) => {
    setErrors(newErrors);
  };

  useEffect(() => {
    if (!token || isLoading || isContextLoaded || isFailed) {
      return;
    }
    setIsLoading(true);
    const requests = [
      questionsShowRequest(examId, questionId, token),
      statesIndexRequest(examId, questionId, token),
    ];

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            const questionsShowResponse = responses[0];
            const statesIndexResponse = responses[1];
            const { question } = questionsShowResponse.data.data;
            setQuestion(question);
            const { states: newStates } = statesIndexResponse.data.data;
            const changedStates = newStates.map((state) => ({
              text_part: state.text_part,
              id: state.state_id,
              integer_part: state.integer_part,
            }));
            setStates(changedStates);
            setIsContextLoaded(true);
            setIsLoading(false);
          }
        })
      )
      .catch((errors) => {
        if (isMounted()) {
          switch (Number(errors?.response?.status)) {
            case 401:
              removeUserInfo();
              break;
            default:
              throwError(errors);
          }
          setIsFailed(true);
          setIsLoading(false);
        }
      });
  }, [
    questionId,
    isFailed,
    examId,
    token,
    isMounted,
    isLoading,
    isContextLoaded,
    removeUserInfo,
    throwError,
  ]);

  const updateQuestion = ({
    question_text,
    question_score,
    deletedStateIds,
    changedStates,
    createdStates,
  }) => {
    setIsLoading(true);
    const bodyOfRequest = {};
    if (question_text) {
      bodyOfRequest.question_text = question_text;
    }
    if (question_score) {
      bodyOfRequest.question_score = question_score;
    }
    const requests = [];
    const questionChanged = Object.keys(bodyOfRequest).length !== 0;
    if (questionChanged) {
      requests.push(
        questionsUpdateRequest(examId, questionId, bodyOfRequest, token)
      );
    }
    if (deletedStateIds) {
      deletedStateIds.forEach((deletedStateId) => {
        requests.push(
          statesDeleteRequest(examId, questionId, deletedStateId, token)
        );
      });
    }
    if (createdStates) {
      createdStates.forEach((createdState) => {
        const createdStateBody = {};
        if (createdState.integer_part !== undefined) {
          createdStateBody.integer_part = createdState.integer_part;
        }
        if (createdState.text_part !== undefined) {
          createdStateBody.text_part = createdState.text_part;
        }
        requests.push(
          statesStoreRequest(examId, questionId, createdStateBody, token)
        );
      });
    }
    if (changedStates) {
      changedStates.forEach((changedState) => {
        const changedStateBody = {};
        const stateBeforeChange = states.find(
          (state) => state.id === changedState.id
        );
        if (
          changedState.integer_part !== undefined &&
          Number(stateBeforeChange.integer_part) !==
            Number(changedState.integer_part)
        ) {
          changedStateBody.integer_part = changedState.integer_part;
        }
        if (
          changedState.text_part !== undefined &&
          stateBeforeChange.text_part !== changedState.text_part
        ) {
          changedStateBody.text_part = changedState.text_part;
        }
        requests.push(
          statesUpdateRequest(
            examId,
            questionId,
            changedState.id,
            changedStateBody,
            token
          )
        );
      });
    }
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            let start = 0,
              end = responses.length - 1;
            if (questionChanged) {
              const questionResponse = responses[0];
              const { question: receivedQuestion } = questionResponse.data.data;
              setQuestion(receivedQuestion);
              start = 1;
            }

            const statesWithoutRemovedStates = deletedStateIds
              ? [
                  ...states.filter((state) => {
                    if (deletedStateIds.includes(state.id)) {
                      return false;
                    }
                    return true;
                  }),
                ]
              : [...states];
            start += deletedStateIds ? deletedStateIds.length : 0;
            if (createdStates) {
              for (let i = start; i < start + createdStates.length; i++) {
                const { state: createdState } = responses[i].data.data;
                statesWithoutRemovedStates.push({
                  text_part: createdState.text_part,
                  integer_part: createdState.integer_part,
                  id: createdState.state_id,
                });
              }
              start += createdStates.length;
            }

            for (let i = start; i <= end; i++) {
              const { state: changedState } = responses[i].data.data;
              for (let j = 0; j < statesWithoutRemovedStates.length; j++) {
                if (
                  statesWithoutRemovedStates[j].id === changedState.state_id
                ) {
                  statesWithoutRemovedStates[j].text_part =
                    changedState.text_part;
                  statesWithoutRemovedStates[j].integer_part =
                    changedState.integer_part;
                }
              }
            }

            setStates(statesWithoutRemovedStates);
            setIsLoading(false);
          }
        })
      )
      .catch((errors) => {
        if (isMounted()) {
          switch (Number(errors?.response?.status)) {
            case 401:
              removeUserInfo();
              break;
            case 422:
              const { message, errors: receivedErrors } = errors.response.data;
              setErrors({ message, ...receivedErrors });
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

  const deleteQuestion = async () => {
    setIsDeleting(true);
    try {
      await questionsDeleteRequest(examId, questionId, token);
      setIsDeleting(false);
      return true;
    } catch (e) {
      switch (Number(e?.response?.status)) {
        case 401:
          removeUserInfo();
          break;
        case 422:
          const { message } = e.response.data;
          setErrors({ message });
          break;
        default:
          setErrors({
            message: "something went wrong, please try again later",
          });
      }
      setIsDeleting(false);
      return false;
    }
  };

  const value = {
    question,
    errors,
    updateQuestion,
    addError,
    states,
    isLoading,
    isDeleting,
    isContextLoaded,
    deleteQuestion,
  };
  return (
    <EditQuestionContext.Provider value={value}>
      {children}
    </EditQuestionContext.Provider>
  );
};
