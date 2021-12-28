import { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";

import PasswordInput from "../../../components/inputs/password-input.component";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { changePassword, isLoading, errors } = useContext(
    AuthenticationContext
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    changePassword(currentPassword, newPassword, confirmNewPassword);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PasswordInput
        label="Current Password"
        error={errors.current_password}
        value={currentPassword}
        id="current-password"
        placeholder="Enter your current password"
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="pb-3"
      />
      <PasswordInput
        label="New Password"
        error={errors.password}
        value={newPassword}
        id="new-password"
        placeholder="Enter your new password"
        onChange={(e) => setNewPassword(e.target.value)}
        className="pb-3"
      />
      <PasswordInput
        label="Confirm New Password"
        error={errors.password_confirmation}
        value={confirmNewPassword}
        id="confirm-new-password"
        placeholder="Enter your new password again"
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        className="pb-3"
      />
      <Button
        variant="success"
        disabled={isLoading}
        className="my-3"
        type="submit"
      >
        {isLoading ? "Loading..." : "Change Password"}
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
