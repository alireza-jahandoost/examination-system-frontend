import SidebarItem from "./sidebar-item.component";

import programRoutes from "../../constants/program-routes.constant";
import useCurrentPath from "../../hooks/useCurrentPath";
import "./sidebar.styles.css";

const Sidebar = (props) => {
  const checkCurrentPath = useCurrentPath();

  return (
    <div className="border-end shadow sidebar-container p-3 d-none d-lg-block">
      <div>
        <div>
          <h2 className="display-6 pt-2 pb-5">Examinator</h2>
        </div>
        <SidebarItem
          active={checkCurrentPath(programRoutes.profile())}
          className="lead mb-3"
          label="Dashboard"
          href={programRoutes.profile()}
          iconName="home"
        />
        <SidebarItem
          active={checkCurrentPath(programRoutes.indexAllExams())}
          className="lead my-3"
          label="all exams"
          href={programRoutes.indexAllExams()}
          iconName="copy"
        />
        <SidebarItem
          active={checkCurrentPath(programRoutes.indexCreatedExams())}
          className="lead my-3"
          label="created exams"
          href={programRoutes.indexCreatedExams()}
          iconName="window-restore"
        />
        <SidebarItem
          active={checkCurrentPath(programRoutes.createExam())}
          className="lead my-3"
          label="create new exam"
          href={programRoutes.createExam()}
          iconName="plus-square"
        />
        <SidebarItem
          active={checkCurrentPath(programRoutes.indexParticipatedExams())}
          className="lead my-3"
          label="participated exams"
          href={programRoutes.indexParticipatedExams()}
          iconName="vial"
        />
        <SidebarItem
          active={checkCurrentPath(programRoutes.settings())}
          className="lead my-3"
          label="settings"
          href={programRoutes.settings()}
          iconName="cogs"
        />
      </div>
    </div>
  );
};

export default Sidebar;
