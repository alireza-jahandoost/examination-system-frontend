import { createContext, useMemo } from "react";
import useRemainingTime from "../../hooks/useRemainingTime";

import {
  convertDateTimeToObject,
  convertSecondsToObject,
} from "../../utilities/dateAndTime.utility";

export const ExamTimeContext = createContext();

export const ExamTimeProvider = ({ children, startTime, endTime }) => {
  const startOfExam = useMemo(
    () => new Date(convertDateTimeToObject(startTime).timestamp),
    [startTime]
  );
  const endOfExam = useMemo(
    () => new Date(convertDateTimeToObject(endTime).timestamp),
    [endTime]
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
    const duration = Math.floor(
      (endOfExam.getTime() - startOfExam.getTime()) / 1000
    );
    return convertSecondsToObject(duration);
  }, [endOfExam, startOfExam]);

  const value = {
    isExamStarted,
    isExamFinished,
    examTimeDuration,
    canUserRegister,
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
    <ExamTimeContext.Provider value={value}>
      {children}
    </ExamTimeContext.Provider>
  );
};
