import { useState, useMemo, useContext } from "react";
import { useMountedState } from "react-use";

import { Button, Form } from "react-bootstrap";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";
import { QuestionTypesContext } from "../../contexts/question-types-context/question-types.context";

import QuestionType from "../question-form-partials/question-type.component";
import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";
import QuestionOptions from "../question-form-partials/question-options.component";
import QuestionAnswers from "../question-form-partials/question-answers.component";

import apiRoutes from "../../constants/api-routes.constant";

import { questionParts } from "../../utilities/question-form-parts.utility";

import { questionsStoreRequest } from "../../services/questions/questions.service";

const CreateQuestion = ({ examId, addQuestion }) => {
  const [errors, setErrors] = useState({});
  const [questionTypeId, setQuestionTypeId] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const { questionTypes } = useContext(QuestionTypesContext);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();

  const parts = useMemo(() => {
    if (!questionTypes) return {};
    return questionParts(questionTypes[questionTypeId - 1]);
  }, [questionTypeId, questionTypes]);

  const handleCreate = (e) => {
    e.preventDefault();

    const bodyOfrequest = {
      question_text: questionText,
      question_score: questionScore,
      question_type_id: questionTypeId,
    };

    questionsStoreRequest(examId, bodyOfrequest, token)
      .then((response) => response.data.data)
      .then(({ question }) => {
        if (isMounted()) {
          addQuestion({
            question_id: question.question_id,
            question_link: apiRoutes.questions.showQuestion(
              examId,
              question.question_id
            ),
          });
        }
      })
      .catch((err) => {
        setErrors({ ...err.response.data });
      });
  };

  return (
    <Form onSubmit={handleCreate}>
      {errors.message && <p className="text-danger"> *{errors.message} </p>}
      {parts.questionType && (
        <QuestionType
          options={questionTypes.map((current) => ({
            value: current.type_id,
            label: current.type_name,
          }))}
          selectedValue={questionTypeId}
          onChange={(e) => setQuestionTypeId(e.target.value)}
          suffix={`not-created-question`}
        />
      )}
      {parts.questionText && (
        <QuestionText
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          suffix={`not-created-question`}
          error={errors.question_text}
        />
      )}
      {parts.questionScore && (
        <QuestionScore
          value={questionScore}
          error={errors.question_score}
          onChange={(e) => setQuestionScore(e.target.value)}
          suffix={`not-created-question`}
        />
      )}
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateQuestion;
