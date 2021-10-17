import React, { useState } from "react";
import SidebarItem from "./sidebar-item.component";

import Toggler from "./toggler.component";
import programRoutes from "../../constants/program-routes.constant";
import "./sidebar.styles.css";

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-success" style={{ minWidth: "50px" }}>
      <Toggler
        title="toggle sidebar"
        open={open}
        className="border-bottom border-dark"
        onClick={() => setOpen((prevOpenState) => !prevOpenState)}
      />
      <SidebarItem
        className="my-3"
        open={open}
        label="overview"
        href={programRoutes.profile}
        iconName="columns"
      />
      <SidebarItem
        className="my-3"
        open={open}
        label="created exams"
        href={programRoutes.indexCreatedExams}
        iconName="window-restore"
      />
      <SidebarItem
        className="my-3"
        open={open}
        label="create new exam"
        href={programRoutes.createExam}
        iconName="plus-square"
      />
      <SidebarItem
        className="my-3"
        open={open}
        label="participated exams"
        href={programRoutes.indexParticipatedExams}
        iconName="vial"
      />
      <SidebarItem
        className="my-3"
        open={open}
        label="settings"
        href={programRoutes.settings}
        iconName="cogs"
      />
    </div>
  );
};

export default Sidebar;
