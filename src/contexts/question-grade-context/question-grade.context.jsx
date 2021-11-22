import { createContext, useState, useContext, useEffect } from "react";
import { useMountedState } from "react-use";

import { AuthenticationContext } from "../authentication-context/authentication.context";

import {
  getGradeRequest,
  storeGradeRequest,
} from "../../services/grades/grades.service";

export const QuestionGradeContext = createContext();

export const QuestionGradeProvider = ({
  children,
  participantId,
  questionId,
}) => {
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const [newGrade, setNewGrade] = useState("");
  const [grade, setGrade] = useState(null);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();

  useEffect(() => {
    if (
      isContextLoaded &&
      (Number(questionId) !== Number(grade.question_id) ||
        Number(participantId) !== Number(grade.participant_id))
    ) {
      if (isMounted()) {
        setIsContextLoaded(false);
      }
    }
  }, [isMounted, participantId, questionId, isContextLoaded, grade]);

  useEffect(() => {
    if (!token || isContextLoaded) {
      return;
    }

    getGradeRequest(participantId, questionId, token)
      .then((response) => response.data.data)
      .then(({ grade: receivedGrade }) => {
        if (isMounted()) {
          setGrade(receivedGrade);
          setIsContextLoaded(true);
        }
      })
      .catch((err) => console.error(err));
  }, [token, isContextLoaded, participantId, questionId, isMounted]);

  const submitGrade = () => {
    storeGradeRequest(participantId, questionId, token, { grade: newGrade })
      .then(() => {
        if (isMounted()) {
          setGrade((prevGrade) => ({ ...prevGrade, grade: Number(newGrade) }));
          setNewGrade("");
        }
      })
      .catch((err) => console.error(err));
  };

  const value = {
    isContextLoaded,
    grade: grade ? Number(grade.grade) : null,
    newGrade,
    changeGrade: (new_grade) => setNewGrade(new_grade),
    submitGrade,
    hasChange: grade ? Number(grade.grade) !== Number(newGrade) : false,
  };

  return (
    <QuestionGradeContext.Provider value={value}>
      {children}
    </QuestionGradeContext.Provider>
  );
};
