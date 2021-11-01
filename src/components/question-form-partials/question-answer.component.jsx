import TextInput from "../inputs/text-input.component";
import DeleteButton from "./delete-button.component";

const QuestionAnswer = ({
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
        onChange={(e) => changeAnswer({ text_part: e.target.value })}
        readOnly={readOnly}
        required={true}
      />
      <DeleteButton
        onClick={deleteAnswer}
        title="Delete Answer"
        disabled={readOnly}
      />
    </div>
  );
};

export default QuestionAnswer;
