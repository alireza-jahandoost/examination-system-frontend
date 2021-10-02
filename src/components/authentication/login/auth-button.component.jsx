import { Button } from "react-bootstrap";

const AuthButton = ({ variant, text, ...props }) => {
  return (
    <Button variant={variant} type="submit" {...props}>
      {text}
    </Button>
  );
};

export default AuthButton;
