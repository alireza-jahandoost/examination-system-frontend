import { useState, useEffect, useMemo, useContext } from "react";
import { useMountedState } from "react-use";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";
import { QuestionTypesContext } from "../../contexts/question-types-context/question-types.context";

import QuestionType from "../question-form-partials/question-type.component";
import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";
import QuestionOptions from "../question-form-partials/question-options.component";
import QuestionAnswers from "../question-form-partials/question-answers.component";

import apiRoutes from "../../constants/api-routes.constant";

import {
  questionParts,
  isStatesValid,
} from "../../utilities/question-form-parts.utility";

import { questionsStoreRequest } from "../../services/questions/questions.service";
import { statesStoreRequest } from "../../services/states/states.service";

const CreateQuestion = ({ examId, addQuestion }) => {
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [questionTypeId, setQuestionTypeId] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const { questionTypes } = useContext(QuestionTypesContext);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();
  const [availableStateId, setAvailableStateId] = useState(1);

  useEffect(() => {
    if (states.length > 0 && states[states.length - 1].id >= availableStateId) {
      setAvailableStateId(states[states.length - 1].id + 1);
    }
  }, [states, availableStateId]);

  const addState = () => {
    setStates((prevStates) => [
      ...prevStates,
      { text_part: "", integer_part: 0, id: availableStateId },
    ]);
  };

  const deleteState = (stateId) => {
    const newStates = states.filter((state) =>
      state.id === stateId ? false : true
    );
    setStates(newStates);
  };

  const changeState = ({ id, text_part = null, integer_part = null }) => {
    // TODO: change another integer parts to false if necessary
    const newStates = states.map((state) => {
      if (state.id === id) {
        const newObj = {};
        if (text_part !== null) {
          newObj.text_part = text_part;
        }
        if (integer_part !== null) {
          newObj.integer_part = integer_part;
        }
        return { ...state, ...newObj };
      }
      if (
        parts.questionOptions !== false &&
        parts.questionOptions.justOneTrueAnswer &&
        integer_part &&
        state.integer_part
      ) {
        return { ...state, integer_part: 0 };
      }
      return state;
    });
    setStates(newStates);
  };

  const parts = useMemo(() => {
    if (questionTypes.length === 0) return {};
    return questionParts(questionTypes[questionTypeId - 1].type_name);
  }, [questionTypeId, questionTypes]);

  const handleCreate = (e) => {
    e.preventDefault();

    const bodyOfrequest = {
      question_text: questionText,
      question_score: questionScore,
      question_type_id: questionTypeId,
    };
    // TODO: customize for different types
    if (!isStatesValid(states, questionTypeId)) {
      if (parts.questionAnswers) {
        setErrors({ question_answers: "You must fill all the states" });
      } else if (parts.questionOptions) {
        setErrors({ question_options: "You must fill all the states" });
      }
      return;
    }

    questionsStoreRequest(examId, bodyOfrequest, token)
      .then((response) => response.data.data)
      .then(({ question }) => {
        if (isMounted()) {
          const stateRequests = states.map((state) => {
            const bodyOfRequest = {};
            if (!parts.questionAnswers) {
              bodyOfRequest.integer_part = state.integer_part;
            }
            bodyOfRequest.text_part = state.text_part;
            return statesStoreRequest(
              examId,
              question.question_id,
              bodyOfRequest,
              token
            );
          });

          axios
            .all(stateRequests)
            .then(
              axios.spread((...responses) => {
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
            )
            .catch((errors) => {
              console.error(errors);
            });
        }
      })
      .catch((err) => {
        setErrors({
          ...err.response.data.errors,
          message: err.response.data.message,
        });
      });
  };

  return (
    <Form onSubmit={handleCreate}>
      {errors.message && <p className="text-danger"> *{errors.message} </p>}
      {parts.questionType && (
        <QuestionType
          options={questionTypes.map((current) => {
            return {
              value: current.type_id,
              label: current.type_name,
            };
          })}
          selectedValue={questionTypeId}
          onChange={(e) => {
            setQuestionTypeId(e.target.value);
          }}
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
      {parts.questionAnswers && (
        <QuestionAnswers
          notCreatedStates={states}
          addState={addState}
          deleteState={deleteState}
          changeState={changeState}
          error={errors.question_answers}
        />
      )}
      {parts.questionOptions && (
        <QuestionOptions
          notCreatedStates={states}
          deleteState={deleteState}
          addState={addState}
          changeState={changeState}
          error={errors.question_options}
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
