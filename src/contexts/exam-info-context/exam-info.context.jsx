import { useEffect, useState, createContext, useMemo } from "react";
import useRemainingTime from "../../hooks/useRemainingTime";
import { examsShowRequest } from "../../services/exams/exams.service";

import {
  convertDateTimeToObject,
  convertSecondsToObject,
} from "../../utilities/dateAndTime.utility";

export const ExamInfoContext = createContext();

export const ExamInfoProvider = ({ children, examId }) => {
  const [exam, setExam] = useState(null);
  useEffect(() => {
    let isCleaningStarted = false;
    examsShowRequest(examId)
      .then((response) => response.data.data)
      .then((data) => {
        if (!isCleaningStarted) {
          setExam(data.exam);
        }
      });
    return () => {
      isCleaningStarted = true;
    };
  }, [examId]);
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
    if (!isExamStarted) {
      return true;
    } else {
      return false;
    }
  }, [isExamStarted]);

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

  return (
    <ExamInfoContext.Provider
      value={{
        examTime,
        canUserRegister,
        exam,
      }}
    >
      {children}
    </ExamInfoContext.Provider>
  );
};
