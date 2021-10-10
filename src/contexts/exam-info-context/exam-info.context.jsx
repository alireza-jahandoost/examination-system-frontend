import { useEffect, useState, createContext, useContext, useMemo } from "react";
import useRemainingTime from "../../hooks/useRemainingTime";
import { examsShowRequest } from "../../services/exams/exams.service";
import { AuthenticationContext } from "../authentication-context/authentication.context";
import { NotificationContext } from "../notification-context/notification.context";

import {
  convertDateTimeToObject,
  convertSecondsToObject,
} from "../../utilities/dateAndTime.utility";

import { registerToExamRequest } from "../../services/participants/participants.service";

export const ExamInfoContext = createContext();

export const ExamInfoProvider = ({ children, examId }) => {
  const { isUserAuthenticated, showUserLoginPopover, token } = useContext(
    AuthenticationContext
  );
  const { createNotification } = useContext(NotificationContext);
  const [exam, setExam] = useState(null);
  const [examPassword, setExamPassword] = useState("");
  const [isUserRegisteredToExam, setIsUserRegisteredToExam] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  useEffect(() => {
    let isCleaningStarted = false;
    examsShowRequest(examId, token)
      .then((response) => response.data.data)
      .then((data) => {
        if (!isCleaningStarted) {
          setExam(data.exam);
          setIsUserRegisteredToExam(data.exam.is_registered);
        }
      });
    return () => {
      isCleaningStarted = true;
    };
  }, [examId]);

  useEffect(() => {
    if (isUserRegisteredToExam) {
      createNotification(
        `You registered in exam "${exam.exam_name}" successfully`,
        3000
      );
    }
  }, [isUserRegisteredToExam]);

  const startOfExam = useMemo(
    () =>
      exam
        ? new Date(convertDateTimeToObject(exam?.start_of_exam).timestamp)
        : null,
    [exam]
  );
  const endOfExam = useMemo(
    () =>
      exam
        ? new Date(convertDateTimeToObject(exam?.end_of_exam).timestamp)
        : null,
    [exam]
  );

  const timeToStart = useRemainingTime(new Date(), startOfExam);
  const timeToEnd = useRemainingTime(new Date(), endOfExam);
  const isExamStarted = timeToStart.isIntervalFinished;
  const isExamFinished = timeToEnd.isIntervalFinished;

  const canUserRegister = useMemo(() => {
    if (!isExamFinished && !isUserRegisteredToExam) {
      return true;
    } else {
      return false;
    }
  }, [isExamFinished, isUserRegisteredToExam]);

  const registerToExam = () => {
    if (isUserAuthenticated) {
      registerToExamRequest(examId, token, examPassword)
        .then(({ data, status }) => {
          if (status === 201) {
            setIsUserRegisteredToExam(true);
          }
        })
        .catch((err) => {
          setPasswordErrorMessage("the password of exam is not correct");
        });
    } else {
      showUserLoginPopover();
    }
  };

  const examTimeDuration = useMemo(() => {
    const duration = startOfExam
      ? Math.floor((endOfExam.getTime() - startOfExam.getTime()) / 1000)
      : 0;
    return convertSecondsToObject(duration);
  }, [endOfExam, startOfExam]);

  const examTime = {
    isExamStarted,
    isExamFinished,
    examTimeDuration,
    seconds: isExamStarted
      ? isExamFinished
        ? 0
        : timeToEnd.seconds
      : timeToStart.seconds,
    minutes: isExamStarted
      ? isExamFinished
        ? 0
        : timeToEnd.minutes
      : timeToStart.minutes,
    hours: isExamStarted
      ? isExamFinished
        ? 0
        : timeToEnd.hours
      : timeToStart.hours,
    days: isExamStarted
      ? isExamFinished
        ? 0
        : timeToEnd.days
      : timeToStart.days,
  };

  const changeExamPassword = (newPassword) => {
    setExamPassword(newPassword);
  };

  return (
    <ExamInfoContext.Provider
      value={{
        examTime,
        canUserRegister,
        exam,
        isUserRegisteredToExam,
        registerToExam,
        examPassword,
        changeExamPassword,
        passwordErrorMessage,
      }}
    >
      {children}
    </ExamInfoContext.Provider>
  );
};
