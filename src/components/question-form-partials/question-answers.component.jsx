import { Row, Col } from "react-bootstrap";
import QuestionAnswer from "./question-answer.component";
import AddNewItem from "./add-new-item.component";

const QuestionAnswers = ({
  readOnly = false,
  notCreatedStates,
  deleteState,
  addState,
  changeState,
  error = "",
}) => {
  return (
    <div>
      {error && <p className="text-danger">*{error}</p>}
      {notCreatedStates.map((answer) => {
        return (
          <QuestionAnswer
            key={answer.id}
            value={answer.text_part}
            deleteAnswer={() => deleteState(answer.id)}
            changeAnswer={(changedState) =>
              changeState({ ...changedState, id: answer.id })
            }
            readOnly={readOnly}
            suffix={`not-created-${answer.id}`}
          />
        );
      })}
      <Row className="mt-2">
        <Col>
          <AddNewItem disabled={readOnly} onClick={addState}>
            create a new answer
          </AddNewItem>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionAnswers;
