import QuestionOption from "./question-option.component";
import AddNewItem from "./add-new-item.component";

const QuestionOptions = ({
  readOnly = false,
  notCreatedStates,
  deleteState,
  addState,
  changeState,
  suffix = "",
  error = "",
}) => {
  return (
    <div>
      {error && <p className="text-danger"> *{error} </p>}
      {notCreatedStates.map((option) => {
        return (
          <QuestionOption
            readOnly={readOnly}
            key={option.id}
            value={option.text_part}
            answer={option.integer_part}
            deleteOption={() => deleteState(option.id)}
            changeOption={(changedState) =>
              changeState({
                ...changedState,
                id: option.id,
              })
            }
            suffix={`${suffix}-option-${option.id}`}
          />
        );
      })}
      <div className="mt-2">
        <AddNewItem onClick={() => addState()} disabled={readOnly}>
          create a new option
        </AddNewItem>
      </div>
    </div>
  );
};

export default QuestionOptions;
