import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import {
  standardTime,
  convertObjectToString,
} from "../../utilities/dateAndTime.utility";

const ExamTime = ({ color, fontSize, examTime }) => {
  const {
    isExamStarted,
    examTimeDuration,
    isExamFinished,
    seconds,
    minutes,
    hours,
    days,
  } = examTime || {};

  const message = isExamFinished
    ? "Exam is over"
    : isExamStarted
    ? "Exam is running"
    : `${days}:${standardTime(hours)}:${standardTime(minutes)}:${standardTime(
        seconds
      )} until start`;

  const [duration, stringDuration] = useMemo(() => {
    return [
      `${examTimeDuration?.days}:${standardTime(
        examTimeDuration?.hours
      )}:${standardTime(examTimeDuration?.minutes)}:${standardTime(
        examTimeDuration?.seconds
      )}`,
      `duration of exam: ${
        examTimeDuration && convertObjectToString(examTimeDuration)
      }`,
    ];
  }, [examTimeDuration]);

  const styles = {};
  if (fontSize !== undefined) {
    styles.fontSize = fontSize;
  }

  if (!examTime) {
    return <p> Loading... </p>;
  }

  return (
    <Row className={`text-${color}`}>
      <Col className="d-flex justify-content-center" xs={12}>
        <p style={styles} className="fw-light">
          {message}
        </p>
      </Col>
      <Col className="d-flex justify-content-center" xs={12}>
        <p style={styles} title={stringDuration} className="fw-light">
          Duration: {duration}
        </p>
      </Col>
    </Row>
  );
};

export default ExamTime;
