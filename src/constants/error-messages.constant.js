const errorMessages = {
  questions: {
    question_text: {
      empty: "the question text field is required",
    },
    question_score: {
      notPositive: "the question score must be a positive number",
    },
    question_answers: {
      emptyAnswer: "the question answer field is required",
    },
    question_options: {
      emptyOption: "the question option field is required",
    },
  },
};

export default errorMessages;
