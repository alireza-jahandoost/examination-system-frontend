import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faWindowRestore,
  faVial,
  faCogs,
  faSpinner,
  faPlusSquare,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SidebarItem = ({ href, iconName, label, ...props }) => {
  const [icon, setIcon] = useState(faSpinner);
  useEffect(() => {
    switch (iconName) {
      case "columns":
        setIcon(faColumns);
        break;
      case "window-restore":
        setIcon(faWindowRestore);
        break;
      case "vial":
        setIcon(faVial);
        break;
      case "cogs":
        setIcon(faCogs);
        break;
      case "plus-square":
        setIcon(faPlusSquare);
        break;
      case "copy":
        setIcon(faCopy);
        break;
      default:
        throw Error("the icon does not found");
    }
  }, [iconName]);
  return (
    <div {...props}>
      <div className="d-flex flex-fill">
        <Link
          className={`text-dark sidebar-item w-100 text-decoration-none `}
          to={href}
          title={label}
        >
          <div className={`d-flex align-items-center word-nowrap`}>
            <FontAwesomeIcon size="lg" icon={icon} />
            <p className="ps-2 m-0">{label}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarItem;
