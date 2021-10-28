import { useContext } from "react";
import { EditQuestionContext } from "../../../contexts/edit-question-context/edit-question.context";
import QuestionAnswer from "./question-answer.component";
import AddNewItem from "./add-new-item.component";

const QuestionAnswers = ({ readOnly = false }) => {
  const { notCreatedStates, deleteState, addState, changeState } = useContext(
    EditQuestionContext
  );

  return (
    <div>
      {notCreatedStates.map((answer) => {
        return (
          <QuestionAnswer
            key={answer.id}
            value={answer.value}
            deleteAnswer={() => deleteState(answer.id)}
            changeAnswer={(changedState) =>
              changeState({ ...changedState, id: answer.id })
            }
            readOnly={readOnly}
          />
        );
      })}
      <AddNewItem disabled={readOnly} onClick={addState}>
        create a new answer
      </AddNewItem>
    </div>
  );
};

export default QuestionAnswers;
