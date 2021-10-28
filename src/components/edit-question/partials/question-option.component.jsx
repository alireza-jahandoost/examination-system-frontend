import AnswerIndicator from "./answer-indicator.component";
import TextInput from "../../inputs/text-input.component";
import DeleteButton from "./delete-button.component";

const QuestionOption = ({
  value,
  answer,
  deleteOption,
  changeOption,
  error = "",
  readOnly = false,
}) => {
  // TODO: id must be unique
  return (
    <div>
      <TextInput
        error={error}
        label="Question option"
        hiddenLabel={true}
        value={value}
        id="question-option"
        placeholder="question option"
        onChange={(e) => changeOption({ value: e.target.value })}
        readOnly={readOnly}
      />
      <DeleteButton
        onClick={deleteOption}
        title="Delete Option"
        disabled={readOnly}
      />
      <AnswerIndicator
        readOnly={readOnly}
        answer={answer}
        onChange={(newAnswer) => changeOption({ answer: newAnswer })}
      />
    </div>
  );
};

export default QuestionOption;
