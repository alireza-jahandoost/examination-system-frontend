import Sidebar from "../../../../components/sidebar/sidebar.component";

const CreatedExamsPage = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <h1>Created Exams</h1>
      </div>
    </div>
  );
};

export default CreatedExamsPage;
