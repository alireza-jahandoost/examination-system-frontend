import { createContext } from "react";

export const AnswerQuestionContext = createContext();

export const AnswerQuestionProvider = ({ children }) => {
  return (
    <AnswerQuestionContext.Provider>{children}</AnswerQuestionContext.Provider>
  );
};
