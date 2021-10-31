export const questionParts = (questionTypeName) => {
  return {
    questionType: true,
    questionText: true,
    questionScore: true,
    questionOptions:
      questionTypeName === "multiple answer" ||
      questionTypeName === "select the answer",
    questionAnswers: questionTypeName === "fill the blank",
  };
};
