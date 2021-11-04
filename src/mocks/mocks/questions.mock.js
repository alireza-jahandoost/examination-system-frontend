import { questionTypesIndex } from "./question-types.mock";

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
      question_score: 10,
      can_be_shuffled: true,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/descriptive",
        question_type_name: "descriptive",
      },
    },
  },
};

export const questionsShowId_2 = {
  data: {
    question: {
      question_text: "Rem error nesciunt quos aut.",
      question_score: 10,
      can_be_shuffled: true,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/fill-the-blank",
        question_type_name: "fill the blank",
      },
    },
  },
};

export const questionsShowId_3 = {
  data: {
    question: {
      question_text: "Id quia voluptas magnam officiis et.",
      question_score: 10,
      can_be_shuffled: false,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/multiple-answers",
        question_type_name: "multiple answers",
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

export const questionsShowId_5 = {
  data: {
    question: {
      question_text: "Error officia animi quidem temporibus at.",
      question_score: 10,
      can_be_shuffled: false,
      question_type: {
        question_type_link:
          "http://localhost:8000/api/question_types/true-or-false",
        question_type_name: "true or false",
      },
    },
  },
};

export const questionsShowId_6 = {
  data: {
    question: {
      question_text: "Error officia animi quidem temporibus at.",
      question_score: 10,
      can_be_shuffled: false,
      question_type: {
        question_type_link: "http://localhost:8000/api/question_types/ordering",
        question_type_name: "ordering",
      },
    },
  },
};

export const questionsStoreTemp = ({
  question_text,
  question_score,
  can_be_shuffled = false,
  question_type_id,
  question_id,
}) => {
  const question_type = questionTypesIndex.data.types[question_type_id - 1];
  return {
    data: {
      question: {
        question_id: question_id,
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
  question_type_name,
}) => {
  let questionInfo;
  switch (Number(question_id)) {
    case 1:
      questionInfo = questionsShowId_1;
      break;
    case 2:
      questionInfo = questionsShowId_2;
      break;
    case 3:
      questionInfo = questionsShowId_3;
      break;
    case 4:
      questionInfo = questionsShowId_4;
      break;
    case 5:
      questionInfo = questionsShowId_5;
      break;
    default:
      questionInfo = questionsShowId_6;
      break;
  }
  return {
    data: {
      question: {
        question_id: question_id,
        question_text:
          question_text || questionInfo.data.question.question_text,
        question_score:
          question_score || questionInfo.data.question.question_score,
        can_be_shuffled:
          can_be_shuffled || questionInfo.data.question.can_be_shuffled,
        question_type: {
          question_type_link: `http://localhost:8000/api/question_types/${question_type_name}`,
          question_type_name: question_type_name,
        },
      },
    },
  };
};
