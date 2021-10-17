import Sidebar from "../../../../components/sidebar/sidebar.component";

const ParticipatedExamsPage = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <h1>Participated Exams</h1>
      </div>
    </div>
  );
};

export default ParticipatedExamsPage;
