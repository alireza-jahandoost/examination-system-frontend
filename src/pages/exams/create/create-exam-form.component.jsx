import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";

import TextInput from "../../../components/inputs/text-input.component";
import NumberInput from "../../../components/inputs/number-input.component";
import TextareaInput from "../../../components/inputs/textarea-input.component";
import CheckboxInput from "../../../components/inputs/checkbox-input.component";

const CreateExamForm = () => {
  const [needsPassword, setNeedsPassword] = useState(false);
  return (
    <Form>
      <Row className="mt-3">
        <Col md={6} xl={3}>
          <TextInput
            label="Exam Name"
            id="exam-name"
            inputProps={{ placeholder: "Exam Name" }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TextareaInput
            label="Exam Description"
            id="exam-description"
            inputProps={{
              placeholder: "Exam Description",
              rows: 3,
              style: { resize: "none" },
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TextInput
            label="Exam's Start"
            id="exams-start"
            inputProps={{
              placeholder: "Exam's Start",
            }}
          />
        </Col>
        <Col>
          <TextInput
            label="Exam's End"
            id="exams-end"
            inputProps={{
              placeholder: "Exam's End",
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} xl={3}>
          <NumberInput
            label="Total Score"
            id="total-score"
            inputProps={{
              placeholder: "Total Score",
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <CheckboxInput
            label="Confirmation Required?"
            id="confirmation-required"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={6} xl={3}>
          <CheckboxInput
            onChange={(e) => setNeedsPassword(e.target.checked)}
            label="Needs Password?"
            id="needs-password"
          />
        </Col>
        {needsPassword && (
          <Col xs={12} md={6} xl={4}>
            <TextInput
              label="Password"
              id="exam-password"
              inputProps={{ placeholder: "Exam's Password" }}
            />
          </Col>
        )}
      </Row>
      <Row className="mt-3">
        <Col>
          <Button> Create </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateExamForm;
