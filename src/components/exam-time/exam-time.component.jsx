import { Col, Row } from "react-bootstrap";
import {
  standardTime,
  convertObjectToString,
} from "../../utilities/dateAndTime.utility";

const ExamTime = ({ color, fontSize, examTime }) => {
  const {
    isExamStarted,
    // examTimeDuration,
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

  const [remainingTime, stringRemainingTime] =
    isExamStarted && !isExamFinished
      ? [
          `${days}:${standardTime(hours || 0)}:${standardTime(
            minutes || 0
          )}:${standardTime(seconds || 0)}`,
          `remaining time: ${convertObjectToString({
            seconds,
            minutes,
            hours,
            days,
          })}`,
        ]
      : ["00:00:00:00", "exam is finished"];

  // const [duration, stringDuration] = useMemo(() => {
  //   return [
  //     `${examTimeDuration.days}:${standardTime(
  //       examTimeDuration.hours || 0
  //     )}:${standardTime(examTimeDuration.minutes || 0)}:${standardTime(
  //       examTimeDuration.seconds || 0
  //     )}`,
  //     `duration of exam: ${
  //       examTimeDuration && convertObjectToString(examTimeDuration)
  //     }`,
  //   ];
  // }, [examTimeDuration]);
  //
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
        <p style={styles} title={stringRemainingTime} className="fw-light">
          Remaining: {remainingTime}
        </p>
      </Col>
    </Row>
  );
};

export default ExamTime;
