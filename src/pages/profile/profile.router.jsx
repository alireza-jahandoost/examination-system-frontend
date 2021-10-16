import Sidebar from "../../components/sidebar/sidebar.component";

const ProfileRouter = () => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="flex-grow-1">
        <h1>Profile</h1>
      </div>
    </div>
  );
};

export default ProfileRouter;
