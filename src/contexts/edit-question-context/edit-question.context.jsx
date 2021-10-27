import { useState, createContext } from "react";

export const EditQuestionContext = createContext();

export const EditQuestionProvider = ({ children }) => {
  const [question, setQuestion] = useState({});
  const [questionTypeId, setQuestionTypeId] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const [canBeShuffled, setCanBeShuffled] = useState(false);

  const value = {
    questionTypeId,
    questionText,
    questionScore,
    canBeShuffled,
    changeQuestionTypeId: (newTypeId) => setQuestionTypeId(newTypeId),
    changeQuestionText: (newQuestionText) => setQuestionText(newQuestionText),
    changeQuestionScore: (questionScore) => setQuestionScore(questionScore),
    changeCanBeShuffled: (canBe) => setCanBeShuffled(canBe),
  };
  return (
    <EditQuestionContext.Provider value={value}>
      {children}
    </EditQuestionContext.Provider>
  );
};
