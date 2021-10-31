import { useContext } from "react";
import { EditQuestionContext } from "../../contexts/edit-question-context/edit-question.context";
import QuestionOption from "./question-option.component";
import AddNewItem from "./add-new-item.component";

const QuestionOptions = ({ readOnly = false }) => {
  const { notCreatedStates, deleteState, addState, changeState } = useContext(
    EditQuestionContext
  );

  return (
    <div>
      {notCreatedStates.map((option) => {
        return (
          <QuestionOption
            readOnly={readOnly}
            key={option.id}
            value={option.value}
            answer={option.answer}
            deleteOption={() => deleteState(option.id)}
            changeOption={(changedState) =>
              changeState({
                ...changedState,
                id: option.id,
                from: "notCreated",
              })
            }
            suffix={`not-created-${option.id}`}
          />
        );
      })}
      <AddNewItem onClick={() => addState()} disabled={readOnly}>
        create a new option
      </AddNewItem>
    </div>
  );
};

export default QuestionOptions;
