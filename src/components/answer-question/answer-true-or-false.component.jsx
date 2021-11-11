import { useContext } from "react";

import { AnswerQuestionContext } from "../../contexts/answer-question-context/answer-question.context";

import AnswerIndicator from "../answer-indicator/answer-indicator.component";

const AnswerTrueOrFalse = () => {
  const { answers, changeAnswers } = useContext(AnswerQuestionContext);

  const handleChange = (newAnswer) => {
    changeAnswers([{ integer_part: Number(newAnswer) }]);
  };

  return (
    <div>
      <AnswerIndicator
        answer={answers && answers[0] && answers[0].integer_part}
        onChange={handleChange}
        suffix="answer-of-question"
        buttonLabels={["True", "False"]}
        noAnswer={!answers || answers.length === 0}
      />
    </div>
  );
};

export default AnswerTrueOrFalse;
