import { useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

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
    errors,
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
          {errors.message && <p className="text-danger">{errors.message}</p>}
          <Row>
            <Col md={6}>
              <NumberInput
                label="Grade"
                value={newGrade}
                id={`grade-of-question-${questionId}`}
                onChange={handleChange}
                error={errors.grade}
              />
            </Col>
            <Col className="d-flex align-items-end">
              {hasChange && (
                <Button type="submit" className="my-2 my-md-0">
                  update grade
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default QuestionGrade;
