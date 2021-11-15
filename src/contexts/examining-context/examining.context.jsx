import { createContext } from "react";

export const ExaminingContext = createContext();

export const ExaminingProvider = ({ children }) => {
  return <ExaminingContext.Provider>{children}</ExaminingContext.Provider>;
};
