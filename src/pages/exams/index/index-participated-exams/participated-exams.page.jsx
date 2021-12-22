import { ParticipatedExamsProvider } from "../../../../contexts/participated-exams-context/participated-exams.context";

import ParticipatedExams from "./participated-exams.component";

const ParticipatedExamsPage = () => {
  return (
    <ParticipatedExamsProvider>
      <ParticipatedExams />
    </ParticipatedExamsProvider>
  );
};

export default ParticipatedExamsPage;
