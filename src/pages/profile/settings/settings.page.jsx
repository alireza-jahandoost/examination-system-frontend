import { useState, useContext } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";

import ProfileContainer from "../../../components/profile-container/profile-container.component";
import PasswordInput from "../../../components/inputs/password-input.component";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const SettingsPage = () => {
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
    <ProfileContainer>
      <h1>Settings</h1>
      <div>
        <Row>
          <Col md={8} lg={6}>
            <div className="text-start bg-light shadow border rounded p-3">
              <h2> Change Password </h2>
              <Form onSubmit={handleSubmit}>
                <PasswordInput
                  label="Current Password"
                  error={errors.current_password}
                  value={currentPassword}
                  id="current-password"
                  placeholder="Enter your current password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <PasswordInput
                  label="New Password"
                  error={errors.password}
                  value={newPassword}
                  id="new-password"
                  placeholder="Enter your new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <PasswordInput
                  label="Confirm New Password"
                  error={errors.password_confirmation}
                  value={confirmNewPassword}
                  id="confirm-new-password"
                  placeholder="Enter your new password again"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <Button disabled={isLoading} className="my-3" type="submit">
                  {isLoading ? "Loading..." : "Change Password"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </ProfileContainer>
  );
};

export default SettingsPage;
