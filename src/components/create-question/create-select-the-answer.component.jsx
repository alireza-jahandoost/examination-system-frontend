import { useState, useEffect, useRef, useContext } from "react";
import { useMountedState } from "react-use";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";

import QuestionText from "../question-form-partials/question-text.component";
import QuestionScore from "../question-form-partials/question-score.component";
import QuestionOptions from "../question-form-partials/question-options.component";

import apiRoutes from "../../constants/api-routes.constant";

import { isStatesValid } from "../../utilities/question-form-parts.utility";

import { questionsStoreRequest } from "../../services/questions/questions.service";
import { statesStoreRequest } from "../../services/states/states.service";

const CreateSelectTheAnswer = ({ examId, addQuestion }) => {
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();
  const nextStateId = useRef(1);

  useEffect(() => {
    if (
      states.length > 0 &&
      states[states.length - 1].id >= nextStateId.current
    ) {
      nextStateId.current = states[states.length - 1].id + 1;
    }
  }, [states]);

  const addState = () => {
    setStates((prevStates) => [
      ...prevStates,
      { text_part: "", integer_part: 0, id: nextStateId.current },
    ]);
  };

  const deleteState = (stateId) => {
    const newStates = states.filter((state) =>
      state.id === stateId ? false : true
    );
    setStates(newStates);
  };

  const changeState = ({ id, text_part = null, integer_part = null }) => {
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
      if (integer_part && state.integer_part) {
        return { ...state, integer_part: 0 };
      }
      return state;
    });
    setStates(newStates);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const bodyOfrequest = {
      question_text: questionText,
      question_score: questionScore,
      question_type_id: 4,
    };
    // TODO: customize for different types
    if (!isStatesValid(states, 4)) {
      setErrors({ question_options: "You must fill all the states" });
      return;
    }

    questionsStoreRequest(examId, bodyOfrequest, token)
      .then((response) => response.data.data)
      .then(({ question }) => {
        if (isMounted()) {
          const stateRequests = states.map((state) => {
            const bodyOfRequest = {};
            bodyOfRequest.integer_part = state.integer_part;
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
      <QuestionText
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        suffix={`not-created-question`}
        error={errors.question_text}
      />
      <QuestionOptions
        notCreatedStates={states}
        deleteState={deleteState}
        addState={addState}
        changeState={changeState}
        error={errors.question_options}
      />
      <QuestionScore
        value={questionScore}
        error={errors.question_score}
        onChange={(e) => setQuestionScore(e.target.value)}
        suffix={`not-created-question`}
      />
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateSelectTheAnswer;
