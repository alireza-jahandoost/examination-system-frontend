import { useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";

import { UserContext } from "../../../../contexts/user-context/user.context";
import { ExamInfoContext } from "../../../../contexts/exam-info-context/exam-info.context";
import { ShowParticipantContext } from "../../../../contexts/show-participant-context/show-participant.context";
import programRoutes from "../../../../constants/program-routes.constant";

const ParticipantInfo = () => {
  const userInfo = useContext(UserContext);
  const examInfo = useContext(ExamInfoContext);
  const participantInfo = useContext(ShowParticipantContext);

  return (
    <Container className="bg-white p-3 border shadow rounded">
      <Table>
        <tbody>
          <tr>
            <td>Exam Name</td>
            <td>
              {examInfo.isContextLoaded ? (
                <Link
                  className="text-decoration-none"
                  to={programRoutes.examiningOverview(examInfo.exam.exam_id)}
                >
                  {examInfo.exam.exam_name}
                </Link>
              ) : (
                "..."
              )}
            </td>
          </tr>
          <tr>
            <td>Start of Exam</td>
            <td>
              {examInfo.isContextLoaded ? examInfo.exam.start_of_exam : "..."}
            </td>
          </tr>
          <tr>
            <td>End of Exam</td>
            <td>
              {examInfo.isContextLoaded ? examInfo.exam.end_of_exam : "..."}
            </td>
          </tr>
          <tr>
            <td>User Name</td>
            <td>
              {userInfo.isContextLoaded ? userInfo.user.user_name : "..."}
            </td>
          </tr>
          <tr>
            <td>User Email</td>
            <td>
              {userInfo.isContextLoaded ? userInfo.user.user_email : "..."}
            </td>
          </tr>
          <tr>
            <td>User Status</td>
            <td>
              {participantInfo.isContextLoaded
                ? participantInfo.participant.status
                : "..."}
            </td>
          </tr>
          <tr>
            <td>User Grade</td>
            <td>
              {participantInfo.isContextLoaded && examInfo.isContextLoaded
                ? examInfo.examTime.isExamFinished
                  ? participantInfo.participant.grade
                  : "_"
                : "..."}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ParticipantInfo;
