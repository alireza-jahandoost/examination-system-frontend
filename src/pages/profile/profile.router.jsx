import { Switch, Route } from "react-router-dom";
import programRoutes from "../../constants/program-routes.constant";
import OverviewPage from "./overview/overview.page";
import SettingsPage from "./settings/settings.page";

const ProfileRouter = () => {
  return (
    <Switch>
      <Route exact path={programRoutes.profile()} component={OverviewPage} />
      <Route exact path={programRoutes.settings()} component={SettingsPage} />
    </Switch>
  );
};

export default ProfileRouter;
