import SidebarItem from "./sidebar-item.component";

import programRoutes from "../../constants/program-routes.constant";
import "./sidebar.styles.css";

const Sidebar = (props) => {
  return (
    <div className="bg-success p-3 d-none d-lg-block">
      <div className="bg-success">
        <SidebarItem
          className="lead mb-3"
          label="overview"
          href={programRoutes.profile()}
          iconName="columns"
        />
        <SidebarItem
          className="lead my-3"
          label="created exams"
          href={programRoutes.indexCreatedExams()}
          iconName="window-restore"
        />
        <SidebarItem
          className="lead my-3"
          label="create new exam"
          href={programRoutes.createExam()}
          iconName="plus-square"
        />
        <SidebarItem
          className="lead my-3"
          label="participated exams"
          href={programRoutes.indexParticipatedExams()}
          iconName="vial"
        />
        <SidebarItem
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
