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

export const isStatesValid = (states, questionTypeId) => {
  switch (Number(questionTypeId)) {
    case 1:
      return states === null || states.length === 0;
    case 2:
      const invalidFillTheBlankElement = states.find(
        (state) => state.text_part === "" || state.integer_part
      );
      return invalidFillTheBlankElement === undefined ? true : false;
    case 3:
      const invalidMultipleAnswerElement = states.find(
        (state) => state.text_part === ""
      );
      return invalidMultipleAnswerElement === undefined ? true : false;
    default:
      return false;
  }
};
