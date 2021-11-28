import { useContext, useState, createContext } from "react";
import axios from "axios";
import { useMountedState } from "react-use";

import { AuthenticationContext } from "../authentication-context/authentication.context";

import { questionsStoreRequest } from "../../services/questions/questions.service";
import { statesStoreRequest } from "../../services/states/states.service";

import { isStatesValid } from "../../utilities/question-form-parts.utility";

export const CreateQuestionContext = createContext();

export const CreateQuestionProvider = ({ children }) => {
  const { token } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState({});
  const isMounted = useMountedState();

  const areStatesValid = ({ states, questionTypeId }) => {
    switch (Number(questionTypeId)) {
      case 2:
        if (!isStatesValid(states, 2)) {
          setErrors({ question_answers: "You must fill all the states" });
          return false;
        }
        return true;

      case 3:
        if (!isStatesValid(states, 3)) {
          setErrors({ question_options: "You must fill all the states" });
          return false;
        }
        return true;

      case 4:
        if (!isStatesValid(states, 4)) {
          setErrors({ question_options: "You must fill all the states" });
          return false;
        }
        return true;

      case 6:
        if (!isStatesValid(states, 6)) {
          setErrors({ question_answers: "You must fill all the states" });
          return false;
        }
        return true;

      default:
    }
  };

  const createQuestion = async ({ examId, questionBody, stateBodies }) => {
    try {
      const questionStoreResponse = await questionsStoreRequest(
        examId,
        questionBody,
        token
      );
      const { question } = questionStoreResponse.data.data;
      if (stateBodies && stateBodies.length > 0) {
        const stateRequests = stateBodies.map((stateBody) => {
          return statesStoreRequest(
            examId,
            question.question_id,
            stateBody,
            token
          );
        });

        await axios.all(stateRequests);
      }
      return question;
    } catch (e) {
      const { errors: receivedErrors, message } = e.response.data;
      const newErrors = { ...receivedErrors, message };
      for (const error in newErrors) {
        if (Array.isArray(newErrors[error])) {
          newErrors[error] = newErrors[error][0];
        }
      }
      setErrors(newErrors);
      return null;
    }
  };

  const value = { createQuestion, areStatesValid, errors };
  return (
    <CreateQuestionContext.Provider value={value}>
      {children}
    </CreateQuestionContext.Provider>
  );
};