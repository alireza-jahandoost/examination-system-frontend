import { ExamInfoProvider } from "../../../../contexts/exam-info-context/exam-info.context";
import IndexParticipants from "./index-participants.component";
import { useParams } from "react-router-dom";

const IndexParticipantsPage = () => {
  const { examId } = useParams();

  return (
    <ExamInfoProvider examId={examId}>
      <IndexParticipants />
    </ExamInfoProvider>
  );
};

export default IndexParticipantsPage;
