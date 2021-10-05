import Popover from "../../popover/popover.component";
import Register from "../../authentication/register/register.component";

const RegisterPopover = ({ onPopoverClose }) => {
  return (
    <Popover onPopoverClose={onPopoverClose}>
      <div className="d-flex h-100 w-100 justify-content-center align-items-center">
        <div
          style={{ width: "min(80%, 1080px)", height: "70%" }}
          className="bg-light"
        >
          <Register />
        </div>
      </div>
    </Popover>
  );
};

export default RegisterPopover;
