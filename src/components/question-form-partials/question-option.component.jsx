import { Row, Col } from "react-bootstrap";
import AnswerIndicator from "../answer-indicator/answer-indicator.component";
import TextInput from "../inputs/text-input.component";
import DeleteButton from "./delete-button.component";

const QuestionOption = ({
  value,
  answer,
  deleteOption,
  changeOption,
  error = "",
  suffix = "",
  readOnly = false,
}) => {
  return (
    <div className="my-2">
      <Row>
        <Col xs={9} xl={6}>
          <TextInput
            error={error}
            label="Question option"
            hiddenLabel={true}
            value={value}
            id={`question-option-${suffix}`}
            placeholder="question option"
            onChange={(e) => changeOption({ text_part: e.target.value })}
            readOnly={readOnly}
          />
        </Col>
        <Col>
          <DeleteButton
            onClick={deleteOption}
            title="Delete Option"
            disabled={readOnly}
          />
        </Col>
      </Row>
      <Row className="mt-1">
        <Col sm={9} md={6}>
          <AnswerIndicator
            readOnly={readOnly}
            answer={answer}
            onChange={(newAnswer) =>
              changeOption({ integer_part: Number(newAnswer) })
            }
            suffix={suffix}
          />
        </Col>
      </Row>
    </div>
  );
};

export default QuestionOption;
