import Popover from "../../popover/popover.component";
import Login from "../../authentication/login/login.component";

const LoginPopover = ({ onPopoverClose }) => {
  return (
    <Popover onPopoverClose={onPopoverClose}>
      <div className="d-flex h-100 w-100 justify-content-center align-items-center">
        <div style={{ width: "80%", height: "70%" }} className="bg-light">
          <Login />
        </div>
      </div>
    </Popover>
  );
};

export default LoginPopover;
