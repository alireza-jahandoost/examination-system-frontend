import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useMountedState } from "react-use";

import { AuthenticationContext } from "../../contexts/authentication-context/authentication.context";

import {
  questionsShowRequest,
  questionsUpdateRequest,
} from "../../services/questions/questions.service";

import {
  statesDeleteRequest,
  statesUpdateRequest,
  statesStoreRequest,
} from "../../services/states/states.service";

import { statesIndexRequest } from "../../services/states/states.service";

import EditDescriptive from "./edit-descriptive.component";
import EditFillTheBlank from "./edit-fill-the-blank.component";
import EditMultipleAnswers from "./edit-multiple-answers.component";
import EditSelectTheAnswer from "./edit-select-the-answer.component";
import EditTrueOrFalse from "./edit-true-or-false.component";
import EditOrdering from "./edit-ordering.component";

const EditQuestion = ({ examId, questionId, readOnly = false }) => {
  const [question, setQuestion] = useState(null);
  const [states, setStates] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();

  const addError = (newErrors) => {
    setErrors(newErrors);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    setIsLoading(true);
    const requests = [
      questionsShowRequest(examId, questionId, token),
      statesIndexRequest(examId, questionId, token),
    ];

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            const questionsShowResponse = responses[0];
            const statesIndexResponse = responses[1];
            const { question } = questionsShowResponse.data.data;
            setQuestion(question);
            const { states: newStates } = statesIndexResponse.data.data;
            const changedStates = newStates.map((state) => ({
              text_part: state.text_part,
              id: state.state_id,
              integer_part: state.integer_part,
            }));
            setStates(changedStates);
            setIsLoading(false);
          }
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, [questionId, examId, token, isMounted]);

  const updateQuestion = ({
    question_text,
    question_score,
    deletedStateIds,
    changedStates,
    createdStates,
  }) => {
    const bodyOfRequest = {};
    if (question_text) {
      bodyOfRequest.question_text = question_text;
    }
    if (question_score) {
      bodyOfRequest.question_score = question_score;
    }
    const requests = [];
    const questionChanged = Object.keys(bodyOfRequest).length !== 0;
    if (questionChanged) {
      requests.push(
        questionsUpdateRequest(examId, questionId, bodyOfRequest, token)
      );
    }
    if (deletedStateIds) {
      deletedStateIds.forEach((deletedStateId) => {
        requests.push(
          statesDeleteRequest(examId, questionId, deletedStateId, token)
        );
      });
    }
    if (createdStates) {
      createdStates.forEach((createdState) => {
        const createdStateBody = {};
        if (createdState.integer_part !== undefined) {
          createdStateBody.integer_part = createdState.integer_part;
        }
        if (createdState.text_part !== undefined) {
          createdStateBody.text_part = createdState.text_part;
        }
        requests.push(
          statesStoreRequest(examId, questionId, createdStateBody, token)
        );
      });
    }
    if (changedStates) {
      changedStates.forEach((changedState) => {
        const changedStateBody = {};
        const stateBeforeChange = states.find(
          (state) => state.id === changedState.id
        );
        if (
          changedState.integer_part !== undefined &&
          Number(stateBeforeChange.integer_part) !==
            Number(changedState.integer_part)
        ) {
          changedStateBody.integer_part = changedState.integer_part;
        }
        if (
          changedState.text_part !== undefined &&
          stateBeforeChange.text_part !== changedState.text_part
        ) {
          changedStateBody.text_part = changedState.text_part;
        }
        requests.push(
          statesUpdateRequest(
            examId,
            questionId,
            changedState.id,
            changedStateBody,
            token
          )
        );
      });
    }
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let start = 0,
            end = responses.length - 1;
          if (questionChanged) {
            const questionResponse = responses[0];
            const { question: receivedQuestion } = questionResponse.data.data;
            setQuestion(receivedQuestion);
            start = 1;
          }

          const statesWithoutRemovedStates = deletedStateIds
            ? [
                ...states.filter((state) => {
                  if (deletedStateIds.includes(state.id)) {
                    return false;
                  }
                  return true;
                }),
              ]
            : [...states];
          start += deletedStateIds ? deletedStateIds.length : 0;
          if (createdStates) {
            for (let i = start; i < start + createdStates.length; i++) {
              const { state: createdState } = responses[i].data.data;
              statesWithoutRemovedStates.push({
                text_part: createdState.text_part,
                integer_part: createdState.integer_part,
                id: createdState.state_id,
              });
            }
            start += createdStates.length;
          }

          for (let i = start; i <= end; i++) {
            const { state: changedState } = responses[i].data.data;
            for (let j = 0; j < statesWithoutRemovedStates.length; j++) {
              if (statesWithoutRemovedStates[j].id === changedState.state_id) {
                statesWithoutRemovedStates[j].text_part =
                  changedState.text_part;
                statesWithoutRemovedStates[j].integer_part =
                  changedState.integer_part;
              }
            }
          }

          setStates(statesWithoutRemovedStates);
        })
      )
      .catch((errors) => {
        console.error(errors);
      }); // .then((response) => response.data.data)
    // .then(({ question }) => setQuestion(question))
    // .catch((err) => console.error(err));
  };

  let questionForm;

  switch (question?.question_type.question_type_name) {
    case "descriptive":
      questionForm = (
        <EditDescriptive
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
        />
      );
      break;
    case "fill the blank":
      questionForm = (
        <EditFillTheBlank
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "multiple answer":
      questionForm = (
        <EditMultipleAnswers
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "select the answer":
      questionForm = (
        <EditSelectTheAnswer
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "true or false":
      questionForm = (
        <EditTrueOrFalse
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    case "ordering":
      questionForm = (
        <EditOrdering
          readOnly={readOnly}
          question={question}
          errors={errors}
          updateQuestion={updateQuestion}
          addError={addError}
          states={states}
        />
      );
      break;
    default:
      questionForm = <p>Loading...</p>;
      break;
  }

  return (
    <div>
      {question && (
        <h3>
          <span> Question Type: </span>
          <span> {question.question_type.question_type_name} </span>
        </h3>
      )}
      {isLoading ? <p> Loading... </p> : questionForm}
    </div>
  );
};

export default EditQuestion;
