import { useEffect, useMemo, useState, useCallback } from "react";
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

  const color = useMemo(() => {
    switch (status) {
      case "not started":
        return "success";
      case "running":
        return "warning";
      case "finished":
        return "danger";
      default:
        return "primary";
    }
  }, [status]);

  return [isPublished ? status : "not published", color];
};

export default useExamStatus;
