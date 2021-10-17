import Sidebar from "../../../components/sidebar/sidebar.component";

const OverviewPage = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <h1>Settings</h1>
      </div>
    </div>
  );
};

export default OverviewPage;
