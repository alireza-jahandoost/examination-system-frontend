import { useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { QuestionGradeContext } from "../../contexts/question-grade-context/question-grade.context";

import NumberInput from "../inputs/number-input.component";

const QuestionGrade = ({ canUserChangeGrade = false, questionId }) => {
  const {
    isContextLoaded,
    grade,
    hasChange,
    submitGrade,
    changeGrade,
    newGrade,
    showGradeEnabled,
    changeGradeEnabled,
  } = useContext(QuestionGradeContext);

  const handleChange = (e) => {
    changeGrade(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitGrade();
  };

  if (!isContextLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {showGradeEnabled && (
        <p className="lead">Grade: {isNaN(grade) ? "not calculated" : grade}</p>
      )}
      {canUserChangeGrade && changeGradeEnabled && (
        <Form onSubmit={handleSubmit}>
          {hasChange && <Button type="submit"> update grade </Button>}
          <NumberInput
            label="Grade"
            value={newGrade}
            id={`grade-of-question-${questionId}`}
            onChange={handleChange}
          />
        </Form>
      )}
    </div>
  );
};

export default QuestionGrade;
