import SidebarItem from "./sidebar-item.component";
import SidebarItemContainer from "./sidebar-item-container.component";

import programRoutes from "../../constants/program-routes.constant";
import externalRoutes from "../../constants/external-routes.constant";
import useCurrentPath from "../../hooks/useCurrentPath";
import "./sidebar.styles.css";

const Sidebar = (props) => {
  const checkCurrentPath = useCurrentPath();

  return (
    <div className="border-end shadow sidebar-container d-none d-lg-flex">
      <div className="overflow-auto p-3 w-320px">
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <div>
            <h2 className="display-6 pt-2 pb-3">Exams Galaxy</h2>
          </div>
          <hr className="text-muted" />
          <SidebarItem
            active={checkCurrentPath(programRoutes.profile())}
            className="lead mb-3"
            label="Dashboard"
            href={programRoutes.profile()}
            iconName="home"
          />
          <SidebarItemContainer
            className="lead mb-3"
            label="Exams"
            iconName="exam"
          >
            <SidebarItem
              active={
                checkCurrentPath(programRoutes.indexAllExams()) ||
                checkCurrentPath(
                  programRoutes.examiningQuestion(":examId", ":questionId")
                ) ||
                checkCurrentPath(programRoutes.examiningOverview(":examId")) ||
                checkCurrentPath(
                  programRoutes.showParticipant(":examId", ":participantId")
                )
              }
              className="lead my-2"
              label="all exams"
              href={programRoutes.indexAllExams()}
            />
            <SidebarItem
              active={
                checkCurrentPath(programRoutes.indexCreatedExams()) ||
                checkCurrentPath(programRoutes.indexParticipants(":examId")) ||
                checkCurrentPath(programRoutes.updateExam(":examId"))
              }
              className="lead my-2"
              label="created exams"
              href={programRoutes.indexCreatedExams()}
            />
            <SidebarItem
              active={checkCurrentPath(programRoutes.createExam())}
              className="lead my-2"
              label="create new exam"
              href={programRoutes.createExam()}
            />
            <SidebarItem
              active={checkCurrentPath(programRoutes.indexParticipatedExams())}
              className="lead my-2"
              label="participated exams"
              href={programRoutes.indexParticipatedExams()}
            />
          </SidebarItemContainer>
          <SidebarItem
            active={checkCurrentPath(programRoutes.settings())}
            className="lead mb-3"
            label="Settings"
            href={programRoutes.settings()}
            iconName="settings"
          />
          <hr className="mt-auto text-muted" />
          <SidebarItem
            active={false}
            className="lead mb-3"
            label="Help"
            href={externalRoutes.help()}
            external={true}
            iconName="help"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
