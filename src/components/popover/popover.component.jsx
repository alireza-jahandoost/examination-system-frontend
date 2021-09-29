import CloseButton from "react-bootstrap/CloseButton";

const Popover = ({ onPopoverClose, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "10",
      }}
    >
      <CloseButton
        onClick={() => {
          onPopoverClose();
        }}
        className="p-3"
        style={{
          position: "fixed",
          fontSize: "3vw",
          right: "3vw",
          top: "3vw",
          zIndex: 20,
        }}
      />
      {children}
    </div>
  );
};

export default Popover;
