import { useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { QuestionGradeContext } from "../../contexts/question-grade-context/question-grade.context";

import NumberInput from "../inputs/number-input.component";

const QuestionGrade = ({ canUserChangeGrade = false }) => {
  const { grade, hasChange, submitGrade, changeGrade, newGrade } = useContext(
    QuestionGradeContext
  );

  const handleChange = (e) => {
    changeGrade(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitGrade();
  };

  return (
    <div>
      <p className="lead"> Grade: {isNaN(grade) ? "not calculated" : grade} </p>
      {canUserChangeGrade && (
        <Form onSubmit={handleSubmit}>
          {hasChange && <Button type="submit"> update grade </Button>}
          <NumberInput
            label="Grade"
            value={newGrade}
            id="grade-of-question"
            onChange={handleChange}
          />
        </Form>
      )}
    </div>
  );
};

export default QuestionGrade;
