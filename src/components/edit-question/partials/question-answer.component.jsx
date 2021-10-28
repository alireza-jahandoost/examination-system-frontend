import TextInput from "../../inputs/text-input.component";
import DeleteButton from "./delete-button.component";

const QuestionOption = ({
  value,
  deleteAnswer,
  changeAnswer,
  error = "",
  suffix = "",
  readOnly = false,
}) => {
  return (
    <div>
      <TextInput
        error={error}
        label="Question Answer"
        hiddenLabel={true}
        value={value}
        id={`question-answer-${suffix}`}
        placeholder="question answer"
        onChange={(e) => changeAnswer({ value: e.target.value })}
        readOnly={readOnly}
      />
      <DeleteButton
        onClick={deleteAnswer}
        title="Delete Answer"
        disabled={readOnly}
      />
    </div>
  );
};

export default QuestionOption;
