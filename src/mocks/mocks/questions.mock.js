import questionTypesIndex from "./question-types.mock";

export const questionsIndex = {
  data: {
    questions: [
      {
        question_id: 1,
        question_link: "http://localhost:8000/api/exams/24/questions/116",
      },
      {
        question_id: 2,
        question_link: "http://localhost:8000/api/exams/24/questions/117",
      },
      {
        question_id: 3,
        question_link: "http://localhost:8000/api/exams/24/questions/118",
      },
      {
        question_id: 4,
        question_link: "http://localhost:8000/api/exams/24/questions/119",
      },
    ],
  },
};

export const questionsShowId_1 = {
  data: {
    question: {
      question_text: "Aut ut assumenda expedita hic.",
      question_score: 80,
      can_be_shuffled: true,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/select-the-answer",
        question_type_name: "select the answer",
      },
    },
  },
};

export const questionsShowId_2 = {
  data: {
    question: {
      question_text: "Rem error nesciunt quos aut.",
      question_score: 66,
      can_be_shuffled: true,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/select-the-answer",
        question_type_name: "select the answer",
      },
    },
  },
};

export const questionsShowId_3 = {
  data: {
    question: {
      question_text: "Id quia voluptas magnam officiis et.",
      question_score: 69,
      can_be_shuffled: false,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/select-the-answer",
        question_type_name: "select the answer",
      },
    },
  },
};

export const questionsShowId_4 = {
  data: {
    question: {
      question_text: "Error officia animi quidem temporibus at.",
      question_score: 10,
      can_be_shuffled: false,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/select-the-answer",
        question_type_name: "select the answer",
      },
    },
  },
};

export const questionsStoreTemp = ({
  question_text,
  question_score,
  can_be_shuffled = false,
  question_type_id,
}) => {
  const question_type = questionTypesIndex.data.types[question_type_id - 1];
  return {
    data: {
      question: {
        question_id: Math.floor(Math.random() * 100) + 1,
        question_text: question_text,
        question_score: question_score,
        can_be_shuffled: can_be_shuffled,
        question_type: {
          question_type_link: `http://localhost:8000/api/question_types/${question_type.type_slug}`,
          question_type_name: question_type.type_name,
        },
      },
    },
  };
};

export const questionsUpdateTemp = ({
  question_text,
  question_score,
  can_be_shuffled,
  question_id,
}) => {
  return {
    data: {
      question: {
        question_id: question_id,
        question_text:
          question_text || questionsShowId_1.data.question.question_text,
        question_score:
          question_score || questionsShowId_1.data.question.question_score,
        can_be_shuffled:
          can_be_shuffled || questionsShowId_1.data.question.can_be_shuffled,
        question_type: {
          question_type_link:
            "http://localhost:8000/api/question_types/descriptive",
          question_type_name: "descriptive",
        },
      },
    },
  };
};
