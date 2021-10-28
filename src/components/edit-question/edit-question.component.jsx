import { useState, useEffect } from "react";
import { EditQuestionProvider } from "../../contexts/edit-question-context/edit-question.context";
import QuestionType from "./partials/question-type.component";
import QuestionText from "./partials/question-text.component";
import QuestionAnswers from "./partials/question-answers.component";
import QuestionScore from "./partials/question-score.component";
import QuestionOptions from "./partials/question-options.component";

const EditQuestion = ({ examId }) => {
  return (
    <EditQuestionProvider>
      <div>Edit Questions</div>
    </EditQuestionProvider>
  );
};

export default EditQuestion;
