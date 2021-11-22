import { createContext } from "react";

export const QuestionGradeContext = createContext();

export const QuestionGradeProvider = ({ children }) => {
  const value = {};

  return (
    <QuestionGradeContext.Provider value={value}>
      {children}
    </QuestionGradeContext.Provider>
  );
};
