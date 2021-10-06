import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import breakpoints from "../../constants/breakpoints.constant";
import DesktopPopover from "./desktop-popover.component";
import MobilePopover from "./mobile-popover.component";
import { ExamTimeProvider } from "../../contexts/exam-time-context/exam-time.context";
import Popover from "../popover/popover.component";
import { examsShowRequest } from "../../services/exams/exams.service";

const ExamDescription = ({ examId, onExamDescriptionClose }) => {
  const [exam, setExam] = useState(null);
  const isXLargeOrBigger = useMediaQuery({
    query: `(min-width: ${breakpoints.xl}px)`,
  });

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

  return (
    <Popover onPopoverClose={onExamDescriptionClose}>
      {exam ? (
        isXLargeOrBigger ? (
          <ExamTimeProvider
            startTime={exam?.start_of_exam}
            endTime={exam?.end_of_exam}
          >
            <DesktopPopover
              exam={exam}
              onExamDescriptionClose={onExamDescriptionClose}
            />
          </ExamTimeProvider>
        ) : (
          <ExamTimeProvider
            startTime={exam?.start_of_exam}
            endTime={exam?.end_of_exam}
          >
            <MobilePopover
              exam={exam}
              onExamDescriptionClose={onExamDescriptionClose}
            />
          </ExamTimeProvider>
        )
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div>Loading...</div>
        </div>
      )}
    </Popover>
  );
};

export default ExamDescription;
