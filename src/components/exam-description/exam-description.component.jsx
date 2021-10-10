import { useMediaQuery } from "react-responsive";
import breakpoints from "../../constants/breakpoints.constant";
import DesktopPopover from "./desktop-popover.component";
import MobilePopover from "./mobile-popover.component";
import Popover from "../popover/popover.component";

const ExamDescription = ({ onExamDescriptionClose }) => {
  const isXLargeOrBigger = useMediaQuery({
    query: `(min-width: ${breakpoints.xl}px)`,
  });

  return (
    <Popover onPopoverClose={onExamDescriptionClose}>
      {isXLargeOrBigger ? (
        <DesktopPopover onExamDescriptionClose={onExamDescriptionClose} />
      ) : (
        <MobilePopover onExamDescriptionClose={onExamDescriptionClose} />
      )}
    </Popover>
  );
};

export default ExamDescription;
