import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsAlarm, BsArrowRight } from "react-icons/bs";
import { convertFromUTC } from "../../../utilities/dateAndTime.utility";
import useExamStatus from "../../../hooks/useExamStatus";
import "./exam-record.style.css";

const ExamRecord = ({ exam, links, ...props }) => {
  const currentStatus = useExamStatus({
    examStart: exam.start_of_exam,
    examEnd: exam.end_of_exam,
  });

  const color = (() => {
    switch (currentStatus) {
      case "not started":
        return "success";
      case "running":
        return "warning";
      default:
        return "danger";
    }
  })();

  return (
    <div {...props}>
      <Container
        className={`bg-white rounded border shadow border-start-${color} border-start-lg`}
      >
        <div>
          <div className="text-start">
            <p className="lead mb-0">
              {exam.exam_name.length > 46
                ? `${exam.exam_name.substr(0, 43)}...`
                : exam.exam_name}
            </p>
            <p className="small text-muted">by {exam.owner_name}</p>
          </div>
          <div className="d-flex text-muted small align-items-center">
            <BsAlarm />
            <p className="m-0 mx-1">{convertFromUTC(exam.start_of_exam)}</p>
            <BsArrowRight />
            <p className="m-0 mx-1">{convertFromUTC(exam.end_of_exam)}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p
              className={`text-${color} font-monospace fw-bold text-start my-3`}
            >
              {currentStatus}
            </p>
            {links.map(({ linkName, linkHref }) => {
              return (
                <Link key={linkName} to={linkHref}>
                  <button className="my-3 bg-white text-dark border-dark border p-1 rounded">
                    {linkName}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ExamRecord;
