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
      const invalidElement = states.find(
        (state) => state.text_part === "" || state.integer_part
      );
      return invalidElement === undefined ? true : false;
    default:
      return false;
  }
};
