import { useEffect, useState, useCallback } from "react";
import { isDateInThePast } from "../utilities/dateAndTime.utility";

const calculate = (examStart, examEnd) => {
  if (isDateInThePast(examStart)) {
    if (isDateInThePast(examEnd)) {
      return "finished";
    } else {
      return "running";
    }
  } else {
    return "not started";
  }
};

const useExamStatus = ({ examStart, examEnd, isPublished }) => {
  const [status, setStatus] = useState(calculate(examStart, examEnd));

  const checkStatus = useCallback(() => {
    setStatus(calculate(examStart, examEnd));
  }, [examStart, examEnd]);

  useEffect(() => {
    if (status === "finished") {
      clearTimeout(checkStatus, 1000);
    }
    setTimeout(checkStatus, 1000);
    return () => clearTimeout(checkStatus, 1000);
  }, [checkStatus, status]);

  return isPublished ? status : "not published";
};

export default useExamStatus;
