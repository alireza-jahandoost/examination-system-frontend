import CreatedExams from "./created-exams.component";

import { CreatedExamsProvider } from "../../../../contexts/created-exams-context/created-exams.context";

const CreatedExamsPage = () => {
  return (
    <CreatedExamsProvider>
      <CreatedExams />
    </CreatedExamsProvider>
  );
};

export default CreatedExamsPage;
