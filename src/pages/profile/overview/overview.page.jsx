import { CreatedExamsProvider } from "../../../contexts/created-exams-context/created-exams.context";
import { ParticipatedExamsProvider } from "../../../contexts/participated-exams-context/participated-exams.context";
import Overview from "./overview.component";

const OverviewPage = () => {
  return (
    <CreatedExamsProvider>
      <ParticipatedExamsProvider>
        <Overview />
      </ParticipatedExamsProvider>
    </CreatedExamsProvider>
  );
};

export default OverviewPage;
