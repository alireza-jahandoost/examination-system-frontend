import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useMountedState } from "react-use";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../authentication-context/authentication.context";
import { convertFromUTC } from "../../utilities/dateAndTime.utility";
import {
  examsShowRequest,
  examsUpdateRequest,
  examsPublishRequest,
  examsUnpublishRequest,
} from "../../services/exams/exams.service";
import { questionsIndexRequest } from "../../services/questions/questions.service";
import { NotificationContext } from "../notification-context/notification.context";

export const UpdateExamContext = createContext();

export const UpdateExamProvider = ({ children }) => {
  const [exam, setExam] = useState(null);
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examStart, setExamStart] = useState("");
  const [examEnd, setExamEnd] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [examPassword, setExamPassword] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPublished, setIsPublished] = useState(false);
  const [isAnyChangeExist, setIsAnyChangeExist] = useState(false);
  const { token } = useContext(AuthenticationContext);
  const isMounted = useMountedState();
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const { createNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (!exam) {
      return;
    }
    if (
      examName !== exam.exam_name ||
      examDescription !== exam.exam_description ||
      totalScore !== exam.total_score ||
      examPassword !== "" ||
      needsConfirmation !== exam.needs_confirmation ||
      examStart !== convertFromUTC(exam.start_of_exam) ||
      examEnd !== convertFromUTC(exam.end_of_exam)
    ) {
      setIsAnyChangeExist(true);
    } else {
      setIsAnyChangeExist(false);
    }
  }, [
    examName,
    examDescription,
    examStart,
    examEnd,
    totalScore,
    examPassword,
    needsConfirmation,
    exam,
  ]);

  useEffect(() => {
    if (!token) {
      return;
    }
    const requests = [
      examsShowRequest(examId, token),
      questionsIndexRequest(examId, token),
    ];
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          if (isMounted()) {
            const examsShowResponse = responses[0];
            const questionsIndexResponse = responses[1];

            const { exam: responseExam } = examsShowResponse.data.data;
            setExam(responseExam);
            setExamName(responseExam.exam_name);
            setExamDescription(responseExam.exam_description);
            setExamStart(convertFromUTC(responseExam.start_of_exam));
            setExamEnd(convertFromUTC(responseExam.end_of_exam));
            setTotalScore(responseExam.total_score);
            setNeedsConfirmation(responseExam.needs_confirmation);
            setIsPublished(responseExam.published);

            const {
              questions: responseQuestions,
            } = questionsIndexResponse.data.data;
            setQuestions(responseQuestions);
          }
        })
      )
      .catch((errors) => {
        setErrors({ message: "something went wrong, please try again later" });
      });
  }, [examId, isMounted, token]);

  const handleUpdate = (bodyOfRequest) => {
    setIsLoading(true);
    examsUpdateRequest(token, bodyOfRequest, examId)
      .then((response) => response.data.data)
      .then((response) => {
        if (isMounted()) {
          setIsLoading(false);
          setExamPassword("");
          setExam(response.exam);
          setExamStart(convertFromUTC(response.exam.start_of_exam));
          setExamEnd(convertFromUTC(response.exam.end_of_exam));
          setErrors({});
        }
      })
      .catch((err) => {
        if (isMounted()) {
          const { message, errors } = err.response.data;
          setErrors({ message, ...errors });
          setIsLoading(false);
        }
      });
  };

  const publishExam = () => {
    examsPublishRequest(token, examId)
      .then(() => {
        setIsPublished(true);
        createNotification("you published this exam successfully", 3000);
        setErrors({});
      })
      .catch((err) => {
        setErrors({ message: err?.response?.data?.data?.message });
      });
  };

  const unpublishExam = () => {
    examsUnpublishRequest(token, examId)
      .then(() => {
        setIsPublished(false);
        createNotification("you unpublished this exam successfully", 3000);
        setErrors({});
      })
      .catch((err) =>
        setErrors({ message: "something went wrong, please try again later" })
      );
  };

  const deleteQuestion = (questionId) => {
    const newQuestions = questions.filter(
      (question) => Number(question.question_id) !== Number(questionId)
    );
    setQuestions(newQuestions);
  };

  const value = {
    exam,
    examId,
    examName,
    examDescription,
    examStart,
    examEnd,
    totalScore,
    examPassword,
    needsConfirmation,
    isLoading,
    errors,
    isPublished,
    isAnyChangeExist,
    questions,
    changeExamName: (newExamName) => setExamName(newExamName),
    changeExamDescription: (newExamDescription) =>
      setExamDescription(newExamDescription),
    changeExamStart: (newExamStart) => setExamStart(newExamStart),
    changeExamEnd: (newExamEnd) => setExamEnd(newExamEnd),
    changeTotalScore: (newTotalScore) => setTotalScore(newTotalScore),
    changeExamPassword: (newExamPassword) => setExamPassword(newExamPassword),
    changeNeedsConfirmation: (newState) => setNeedsConfirmation(newState),
    addQuestion: (newQuestion) =>
      setQuestions((prev) => [...prev, newQuestion]),
    handleUpdate,
    publishExam,
    unpublishExam,
    deleteQuestion,
  };

  return (
    <UpdateExamContext.Provider value={value}>
      {" "}
      {children}{" "}
    </UpdateExamContext.Provider>
  );
};
