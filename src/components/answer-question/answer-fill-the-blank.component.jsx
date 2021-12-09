import { useContext } from "react";

import TextInput from "../inputs/text-input.component";

import { AnswerQuestionContext } from "../../contexts/answer-question-context/answer-question.context";

const AnswerFillTheBlank = ({ readOnly = false }) => {
  const { answers, changeAnswers } = useContext(AnswerQuestionContext);

  const handleChange = (e) => {
    if (e.target.value === "") {
      changeAnswers([]);
    } else {
      changeAnswers([{ text_part: e.target.value }]);
    }
  };

  return (
    <div className="d-inline-block">
      <TextInput
        label="Answer of Question"
        value={answers.length > 0 ? answers[0].text_part : ""}
        id="answer-of-question"
        placeholder="Write your answer"
        onChange={handleChange}
        hiddenLabel={true}
        readOnly={readOnly}
        textCenter={true}
      />
    </div>
  );
};

export default AnswerFillTheBlank;
