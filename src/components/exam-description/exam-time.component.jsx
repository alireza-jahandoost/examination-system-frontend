import { useContext, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { ExamTimeContext } from "../../contexts/exam-time-context/exam-time.context";
import {
  standardTime,
  convertObjectToString,
} from "../../utilities/dateAndTime.utility";

const ExamTime = ({ color, fontSize }) => {
  const {
    isExamStarted,
    examTimeDuration,
    isExamFinished,
    seconds,
    minutes,
    hours,
    days,
  } = useContext(ExamTimeContext);

  const message = isExamFinished
    ? "Exam is over"
    : isExamStarted
    ? "Exam is running"
    : `${days}:${standardTime(hours)}:${standardTime(minutes)}:${standardTime(
        seconds
      )} until start`;

  const [duration, stringDuration] = useMemo(() => {
    return [
      `${examTimeDuration.days}:${standardTime(
        examTimeDuration.hours
      )}:${standardTime(examTimeDuration.minutes)}:${standardTime(
        examTimeDuration.seconds
      )}`,
      `duration of exam: ${convertObjectToString(examTimeDuration)}`,
    ];
  }, [examTimeDuration]);

  return (
    <Row className={`text-${color}`}>
      <Col className="d-flex justify-content-center" xs={12}>
        <p style={{ fontSize: fontSize }} className="fw-light">
          {message}
        </p>
      </Col>
      <Col className="d-flex justify-content-center" xs={12}>
        <p
          style={{ fontSize: fontSize }}
          title={stringDuration}
          className="fw-light"
        >
          Duration: {duration}
        </p>
      </Col>
    </Row>
  );
};

export default ExamTime;
