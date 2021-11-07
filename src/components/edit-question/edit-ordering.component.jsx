import { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";
import QuestionAnswers from "../question-form-partials/question-answers.component";

import errorMessages from "../../constants/error-messages.constant";

const EditOrdering = ({
  question,
  errors,
  updateQuestion,
  addError,
  states,
  readOnly = false,
}) => {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [questionScore, setQuestionScore] = useState(question.question_score);
  const [hasChange, setHasChange] = useState(false);
  const [currentStates, setCurrentStates] = useState([]);
  const nextStateId = useRef(1);

  useEffect(() => {
    if (
      currentStates.length > 0 &&
      currentStates[currentStates.length - 1].id >= nextStateId.current
    ) {
      nextStateId.current = currentStates[currentStates.length - 1].id + 1;
    }
  }, [currentStates]);

  const addState = () => {
    setCurrentStates((prevStates) => [
      ...prevStates,
      {
        text_part: "",
        id: nextStateId.current,
        integer_part: prevStates.length + 1,
      },
    ]);
  };

  const deleteState = (stateId) => {
    const newStates = currentStates.filter((state) =>
      state.id === stateId ? false : true
    );
    for (let i = 0; i < newStates.length; i++) {
      newStates[i].integer_part = i + 1;
    }
    setCurrentStates([...newStates]);
  };

  const changeState = ({ id, text_part = null }) => {
    const newStates = currentStates.map((state) => {
      if (state.id === id) {
        const newObj = {};
        if (text_part !== null) {
          newObj.text_part = text_part;
        }
        return { ...state, ...newObj };
      }
      return state;
    });
    setCurrentStates([...newStates]);
  };

  useEffect(() => {
    if (typeof states !== "object") {
      return;
    }
    setCurrentStates(states);
  }, [states]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (questionText === "") {
      addError({ question_text: errorMessages.questions.question_text.empty });
      return;
    }
    if (questionScore === "" || questionScore <= 0) {
      addError({
        question_score: errorMessages.questions.question_score.notPositive,
      });
      return;
    }
    const invalidState = currentStates.find((state) => state.text_part === "");
    if (invalidState !== undefined) {
      addError({
        question_answers: errorMessages.questions.question_answers.emptyAnswer,
      });
      return;
    }

    const statesId = states.map((state) => state.id);
    const currentStatesId = currentStates.map((state) => state.id);
    // states - currentStates
    const deletedStateIds = statesId.filter((stateId) => {
      if (currentStatesId.includes(stateId)) {
        return false;
      }
      return true;
    });
    // currentStates - states
    const createdStates = currentStates.filter((currentState) => {
      if (statesId.includes(currentState.id)) {
        return false;
      }
      return true;
    });
    // states & currentStates
    const changedStates = currentStates.filter((currentState) => {
      const matchedState = states.find((state) => state.id === currentState.id);
      if (
        matchedState !== undefined &&
        matchedState.text_part !== currentState.text_part
      ) {
        return true;
      }
      return false;
    });
    // TODO: add states to changed properties
    const changedProperties = {};

    if (deletedStateIds.length > 0) {
      changedProperties.deletedStateIds = deletedStateIds;
    }
    if (changedStates.length > 0) {
      changedProperties.changedStates = changedStates;
    }
    if (createdStates.length > 0) {
      changedProperties.createdStates = createdStates;
    }

    if (questionText !== question.question_text) {
      changedProperties.question_text = questionText;
    }
    if (questionScore !== question.question_score) {
      changedProperties.question_score = questionScore;
    }
    updateQuestion(changedProperties);
  };

  useEffect(() => {
    if (typeof states !== "object") {
      return;
    }
    const statesChanged =
      JSON.stringify(states) !== JSON.stringify(currentStates);
    if (
      questionText !== question.question_text ||
      Number(questionScore) !== Number(question.question_score) ||
      statesChanged
    ) {
      setHasChange(true);
    } else {
      setHasChange(false);
    }
  }, [
    questionText,
    states,
    currentStates,
    questionScore,
    question.question_text,
    question.question_score,
  ]);

  return (
    <Form onSubmit={handleSubmit}>
      {errors.message && <p className="text-danger"> *{errors.message} </p>}
      <QuestionText
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        suffix={`question-${question.question_id}`}
        error={errors.question_text}
        readOnly={readOnly}
      />
      <QuestionAnswers
        notCreatedStates={currentStates}
        addState={addState}
        deleteState={deleteState}
        changeState={changeState}
        error={errors.question_answers}
        readOnly={readOnly}
      />
      <QuestionScore
        value={questionScore}
        error={errors.question_score}
        onChange={(e) => setQuestionScore(e.target.value)}
        suffix={`question-${question.question_id}`}
        readOnly={readOnly}
      />
      {hasChange ? (
        <Button disabled={readOnly} variant="primary" type="submit">
          save changes
        </Button>
      ) : (
        <p> all changes saved </p>
      )}
    </Form>
  );
};

export default EditOrdering;
